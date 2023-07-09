import { NextResponse } from "next/server";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { makeChain } from "@/utils/makechain";
import { pinecone } from "@/utils/pinecone-client";
import { PINECONE_INDEX_NAME } from "@/config/pinecone";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth/next";

export async function POST(req) {
  const { file,docName } = await req.json();

  const sanitizedText = file.data?.trim().replace("\n", " ");
  console.log("sanitized Text", sanitizedText);
  try {
    const index = pinecone.Index(PINECONE_INDEX_NAME);

    /* create vectorstore*/
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({}),
      {
        pineconeIndex: index,
        textKey: "text",
        namespace: docName,
      }
    );
    //create chain
    const chain = makeChain(vectorStore);
    
    
    const session = await getServerSession();
    console.log("Session ", session)

    try {
      await connectToDB();
      // Access user id from the session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      // Try to find an existing document with the same filename
      let document = await Document.findOne({
        title: title,
        uploadedBy: sessionUser._id.toString(),
      });

      if (!document) {
        // If the document doesn't exist, create a new one
        document = new Document({
          title: title,
          uploadedBy: sessionUser._id.toString(),
        });
      }

      // Push new data into the document's file array
      document.file.push({ data: sanitizedText, message: sanitizedText });

      await document.save();

      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json("Failed to create new document", error);
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      error: error.message || "Something went wrong",
    });
  }
}
