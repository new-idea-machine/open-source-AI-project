import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { pinecone } from "@/utils/pinecone-client";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PINECONE_INDEX_NAME } from "@/config/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { Conversation } from "@/models/chat";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth/next";

let newFileName;

export async function POST(request) {
  const formData = await request.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  newFileName = file.name;

  const buffer = Buffer.from(await file.arrayBuffer());

  const relativeUploadDir = `/`;
  const uploadDir = join(process.cwd(), "docs", relativeUploadDir);

  try {
    const session = await getServerSession();

    if (session) {
      await connectToDB();
      // Access user id from the session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      // Try to find an existing conversation with the same filename
      let conversation = await Conversation.findOne({
        userId: sessionUser._id.toString(),
        filename: newFileName,
      });

      if (conversation) {
        // Extract base filename and extension
        const baseName = newFileName.replace(/\.[^/.]+$/, "");
        const extension = newFileName.split(".").pop();

        let counter = 1;
       
        do {
          newFileName = `${baseName}(${counter}).${extension}`;
          conversation = await Conversation.findOne({
            userId: sessionUser._id.toString(),
            filename: newFileName,
          });
    
          counter += 1; // Increment counter
        } while (conversation); // Repeat until a unique filename is found
    
        conversation = new Conversation({
          userId: sessionUser._id.toString(),
          filename: newFileName,
          chat: [],
        });
      } else {
        conversation = new Conversation({
          userId: sessionUser._id.toString(),
          filename: newFileName,
          chat: [],
        });
      }
      await conversation.save();
    }

    const filename = newFileName;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const filePath = join(uploadDir, filename);

    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(uploadDir, {
      ".txt": (path) => new TextLoader(path),
      ".pdf": (path) => new PDFLoader(path),
    });

    // const loader = new PDFLoader(filePath);
    const rawDocs = await directoryLoader.load();
    console.log(rawDocs);

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log("split docs", docs);
    console.log(`Text split into ${docs.length} docs`);

    console.log("creating vector store...");

    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings({
      modelName: "text-embedding-ada-002",
    });

    const index = pinecone.Index(PINECONE_INDEX_NAME);

    //embed the PDF documents
    const response = await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: filename,
      textKey: "text",
    });

    await unlink(filePath);

    return NextResponse.json(response);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      error: error.message || "Failed to ingest your data",
    });
  }
}
