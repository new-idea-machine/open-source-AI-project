import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Conversation } from "@/models/chat";

export async function DELETE(req, context) {
  try {
    await connectToDB();
    let id = context.params.id
    // console.log("id passes: ", id)
    const conversations = await Conversation.findByIdAndDelete({ _id : id}).exec();

    // console.log("Delete Document",conversations);
    return NextResponse.json(conversations);
  } catch (e) {
    console.error(e);
    return NextResponse.json("Error deleting file");
  }
}
