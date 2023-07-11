import { NextResponse } from "next/server";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { makeChain } from "@/utils/makechain";
import { pinecone } from "@/utils/pinecone-client";
import { PINECONE_INDEX_NAME } from "@/config/pinecone";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { Conversation } from "@/models/chat";
import { getServerSession } from "next-auth/next";

export async function POST(req) {
  const { file,docName } = await req.json();
  console.log("file, docname", file, docName)

  const sanitizedText = file?.trim().replace("\n", " ");
  console.log("sanitized Text", sanitizedText);
  try {

    const session = await getServerSession();
    console.log("Session ", session)

    try {
      await connectToDB();
      // Access user id from the session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      // Try to find an existing document with the same filename
      let conversation = await Conversation.findOne({
        userId: sessionUser._id.toString(),
        filename: docName,
      });
 
      if (!conversation) {
        // If the conversation doesn't exist, create a new one
        conversation = new Conversation({
          userId: sessionUser._id.toString(),
          filename: docName,
          chat: [],
          document: {
            title: docName,
            file: sanitizedText,
          },
        })
      }

      // Push new data into the document's file array
      conversation.document.push({ title:docName, file: sanitizedText });
      console.log("conversation ", conversation)
      await conversation.save();

      return NextResponse.json(conversation);
    
    } catch (error) {
      return NextResponse.json( "Failed to create new document",error);
    }
   
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      error: error.message || "Something went wrong",
    });
  }
}
