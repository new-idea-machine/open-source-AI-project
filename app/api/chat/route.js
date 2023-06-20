import { NextResponse } from "next/server";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { makeChain } from "@/utils/makechain";
import { pinecone } from "@/utils/pinecone-client";
import { PINECONE_INDEX_NAME } from "@/config/pinecone";
import { Conversation } from "@/models/chat";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth/next";

export async function POST(req) {
  const { question, history, docName } = await req.json();

  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question?.trim().replace("\n", " ");
  console.log("sanitizedQuestion", sanitizedQuestion);

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

    //Ask a question using chat history
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history,
    });
  
    const session = await getServerSession();

    if (session) {
      try {
        await connectToDB();

        // Access user id from the session
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();

        // Try to find an existing conversation with the same filename
        let conversation = await Conversation.findOne({
          userId: sessionUser._id.toString(),
          filename: docName,
        });

        // Add new messages to the conversation
        conversation.chat.push({ sender: "human", message: sanitizedQuestion });
        conversation.chat.push({ sender: "ai", message: response.text });

        await conversation.save();

        return NextResponse.json(response);
      } catch (error) {
        return NextResponse.json("Failed to create a new Message");
      }
    } else {
      return NextResponse.json("Unauthorized");
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      error: error.message || "Something went wrong",
    });
  }
}
