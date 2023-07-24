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
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate } from "langchain/prompts";


export async function POST(req) {
  const { question, history, docName   } = await req.json();
  let chatStyle = "funny"
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
    console.log("this is :" , chatStyle , "style")

    const chat = new ChatOpenAI({temperature: 0});
    let resChatStyle = "";

    const res =  ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate("You are a {chatStyle} and helpful assistant that answers {question} in a funny manner ")
    ],
    HumanMessagePromptTemplate.fromTemplate("{text}"))

  const llmChain = new LLMChain({
      prompt: res,
      llm : chat
  })

    //Ask a question using chat history
    const response = await llmChain.call({ text : {

      chat_history: history,
    },
    question: sanitizedQuestion,
    chatStyle:chatStyle

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
