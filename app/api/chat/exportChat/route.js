import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Conversation } from "@/models/chat";
import { getServerSession } from "next-auth";

export async function POST(req, res) {
  const { id, filename } = await req.json();
  // console.log(" export chat ", id, filename);
  // const session = await getServerSession();
  // console.log(session)
  try {
    await connectToDB();
    try {
      let conversation = await Conversation.findOne({
        _id: id,
        filename: filename,
      });
      if (!conversation) {
        return NextResponse.json("Conversation not found");
      }

      // Filter chat messages for "human" and "ai" senders
      const filteredChat = conversation.chat.filter(
        (message) =>
          message && (message.sender === "human" || message.sender === "ai")
      );

      // Create the text content from the filtered chat messages
      let textContent = "";
      filteredChat.forEach((message) => {
        textContent += `${message.sender}: ${message.message}\n`;
      });

      // console.log(" file ", textContent);
      return NextResponse.json(textContent);
    } catch (error) {
      return NextResponse.json("Error exporting the chat");
    }
  } catch (error) {
    return NextResponse.json("Error connecting to Database");
  }
}
