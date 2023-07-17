import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Conversation } from "@/models/chat";
import { getServerSession } from "next-auth";

export async function PUT(req) {
  const { id, filename, updatedChat } = await req.json();
  // console.log(" update ", id, filename, updatedChat);
  // const session = await getServerSession();
  // console.log(session)
  try {
    await connectToDB();
    try {
      let conversation = await Conversation.findOne({
        _id: id,
        filename: filename,
      });
      
      conversation.chat.push(updatedChat);
      await conversation.save();

      return NextResponse.json(conversation);
    } catch (error) {
      return NextResponse.json("Error updating document");
    }
  } catch (error) {
    return NextResponse.json("Error connecting to Database");
  }
}
