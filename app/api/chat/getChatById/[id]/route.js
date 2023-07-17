import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Conversation } from "@/models/chat";
import { getServerSession } from "next-auth/next";
import User from "@/models/user";

export async function GET(req, context) {
  let id = context.params.id;
  // console.log("id", id);

  try {
    await connectToDB();

    // Try to find an existing conversation with the same filename
    let conversation = await Conversation.findById({ _id: id });

    //  console.log("conversation", conversation)
    return NextResponse.json(conversation.chat);
  } catch (e) {
    console.error(e);
    return NextResponse.json("Error fetching conversations");
  }
}
