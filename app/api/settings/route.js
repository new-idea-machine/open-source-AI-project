import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { NextResponse } from "next/server";
import { LLMChain } from "langchain/chains";

export async function POST(req) {
  const { question, chatStyle } = await req.json();
  // console.log("question ",question, chatStyle);
  const chat = new ChatOpenAI({ temperature: 0.4 });
  let resChatStyle = "";
  //   let serious = "You are a serious "

  let prompt;

  if (chatStyle === "angry") {
    let angryPreprompt =
      "You are an extremely angry assistant and you curse and you are extremely impatient.\n";
    prompt = angryPreprompt + "answer the following: {question}";
  } else if (chatStyle === "sarcastic") {
    let sarcasticPrePrompt =
      "You are extremely annoyed, disinterested, mocks, ridicules. You say the opposite of what you mean (verbal irony) and doing it in a particularly hostile tone.\n";
    prompt = sarcasticPrePrompt + "answer the following: {question}";
  } else if (chatStyle === "funny") {
    let funnyPrePrompt =
      "You are an outgoing, emotionally stable, conscientious, open-minded, and agreeable assistant.\n";
    prompt = funnyPrePrompt + "answer the following: {question}";
  } else if (chatStyle === "serious") {
    let seriousPrePrompt =
      "You are a serious assistent who is quiet, thinks carefully about things, and does not have fun conversations a lot.\n";
    prompt = seriousPrePrompt + "answer the following: {question}";
  } else {
    let defaultPrePrompt = "You are a chat assistant who answers questions.\n";
    prompt = defaultPrePrompt + "answer the following: {question}";
  }

  console.log("this is :", chatStyle, "style");
  const res = ChatPromptTemplate.fromPromptMessages(
    [SystemMessagePromptTemplate.fromTemplate(prompt)],
    HumanMessagePromptTemplate.fromTemplate("{text}")
  );

  const chain = new LLMChain({
    prompt: res,
    llm: chat,
  });

  resChatStyle = await chain.call({
    question: question,
    text: question,
    chatStyle: chatStyle,
  });

//   console.log(resChatStyle);
  return NextResponse.json(prompt);
}
