import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Conversation } from "@/models/chat";
import { getServerSession } from "next-auth";

export async function PUT(req) {
  const { id, updatedFilename } = await req.json();
  // console.log(" rename ", id, updatedFilename);
  // const session = await getServerSession();
  // console.log(session)
  try {
    await connectToDB();
    let conversation = await Conversation.findByIdAndUpdate(
      id,
      {filename : updatedFilename}
    );
    await conversation.save();

    return NextResponse.json(conversation)
  } catch (error) {
    return NextResponse.json("Error connecting to Database");
  }
}
