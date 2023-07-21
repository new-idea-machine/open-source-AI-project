import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { chatStyle } = await req.json();
  //   console.log("question ",question, chatStyle);
  const chat = new ChatOpenAI();
  let resChatStyle = "";

  switch (chatStyle) {
    case "funny":
      //   console.log("This is funny");
      resChatStyle = await chat.call([
        new SystemChatMessage(
          "You are a funny and helpful chatbot that replies in a funny manner to the all the questions asked to you along with the answer. "
        ),
        new HumanChatMessage("{question}"),
      ]);

      return NextResponse.json(resChatStyle);
    //   break;

    case "sarcastic":
      //   console.log("This is sarcastic");
      resChatStyle = await chat.call([
        new SystemChatMessage(
          "You are a sarcastic and helpful chatbot that replies in a sarcastic manner to the all the questions asked to you along with the answer. "
        ),
        // new HumanChatMessage("{question}"),
      ]);

      return NextResponse.json(resChatStyle);
      break;

    case "serious":
      //   console.log("This is serious");
      resChatStyle = await chat.call([
        new SystemChatMessage(
          "You are a serious and helpful chatbot that replies in a serious manner to the all the questions asked to you along with the answer. "
        ),
        // new HumanChatMessage("{question}"),
      ]);

      return NextResponse.json(resChatStyle);
      break;

    case "angry":
      //   console.log("This is angry");
      resChatStyle = await chat.call([
        new SystemChatMessage(
          "You are a serious and helpful chatbot that replies in a serious manner to the all the questions asked to you along with the answer. "
        ),
        // new HumanChatMessage("{question}"),
      ]);

      return NextResponse.json(resChatStyle);
      break;

    default:
      console.log("default case");
  }
}
