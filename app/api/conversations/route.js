import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Conversation } from "@/models/chat";
import { getServerSession } from "next-auth/next";
import User from "@/models/user";

export async function POST(req) {
  const session = await getServerSession();

  if (session) {
    try {
      await connectToDB();

      const { id, filename } = await req.json();
      // console.log("id filename", id, filename);

      // Access user id from the session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      // Try to find an existing conversation with the same filename
      let conversation = await Conversation.findOne({
        userId: session.user.id,
        filename: filename,
      });

      //  console.log("conversation", conversation)
      return NextResponse.json(conversation);
    } catch (e) {
      console.error(e);
      return NextResponse.json("Error fetching conversations");
    }
  } else {
    return NextResponse.json("Unauthorized");
  }
}
