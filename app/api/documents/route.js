import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Conversation } from "@/models/chat";

export const GET = async (req) => {
  try {
    await connectToDB();

    const conversations = await Conversation.find({}).exec();

    const filenames = conversations.map((conversation) => conversation);

    return NextResponse.json(filenames);
  } catch (e) {
    console.error(e);
    return NextResponse.json("Error fetching conversations");
  }
};
