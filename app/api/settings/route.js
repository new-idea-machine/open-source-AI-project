import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate } from "langchain/prompts";
import { NextResponse } from "next/server";
import { LLMChain } from "langchain/chains";

export async function POST(req) {
  const { question ,chatStyle } = await req.json();
    // console.log("question ",question, chatStyle);
  const chat = new ChatOpenAI({temperature: 0});
  let resChatStyle = "";

  switch (chatStyle) {
    case "funny":

    const res =  ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate("You are a funny and helpful assistant that answers {question} in a funny manner ")
    ],
    HumanMessagePromptTemplate.fromTemplate("{text}"))

    const chain = new LLMChain({
        prompt: res,
        llm : chat
    })

     resChatStyle = await chain.call({
        question : question,
        text : question
    })

      //   console.log("This is funny");
    //   resChatStyle = await chat.call([
    //     new SystemChatMessage(
    //       "You are a funny and helpful chatbot that responds to {question} in a funny manner. "
    //     ),
    //     new HumanChatMessage("{question}"),
    //   ]);

      return NextResponse.json(resChatStyle);
    //   break;

    case "sarcastic":
      //   console.log("This is sarcastic");
      resChatStyle = await chat.call([
        new SystemChatMessage(
          "You are a sarcastic and helpful chatbot that responds to {question} in a sarcastic manner . "
        ),
        // new HumanChatMessage("{question}"),
      ]);

      return NextResponse.json(resChatStyle);
      break;

    case "serious":
      //   console.log("This is serious");
      resChatStyle = await chat.call([
        new SystemChatMessage(
          "You are a serious and helpful chatbot that replies in a serious manner to the all the questions asked to you. "
        ),
        new HumanChatMessage("{question}"),
      ]);

      return NextResponse.json(resChatStyle);
      break;

    case "angry":
      //   console.log("This is angry");
      resChatStyle = await chat.call([
        new SystemChatMessage(
          "You are a serious and helpful chatbot that replies in a serious manner to the all the questions asked to you. "
        ),
        new HumanChatMessage("{question}"),
      ]);

      return NextResponse.json(resChatStyle);
      break;

    default:
      console.log("default case");
  }
}
