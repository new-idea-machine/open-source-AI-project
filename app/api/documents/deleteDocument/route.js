import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Conversation } from "@/models/chat";
import { PINECONE_INDEX_NAME } from "@/config/pinecone";
import { pinecone } from "@/utils/pinecone-client";

export async function POST(req) {
  try {
    const data = await req.json();
    const id = data.id;
    const filename = data.filename;
    
    const index = pinecone.Index(PINECONE_INDEX_NAME);
   
    // Delete vectors
    await index.delete1({
      deleteAll: true,
      namespace: filename,
    });

    console.log(" Deleted pinecone vectors for : ", filename);

    await connectToDB();
    let conversation = await Conversation.findByIdAndDelete(
      { _id: id },
      { filename: filename }
    );
    
    console.log("Deleted from MongoDB",conversation)
    return NextResponse.json(" Deleted document from pinecone and MongoDB");
  } catch (error) {
    return NextResponse.json(error);
  }
}
