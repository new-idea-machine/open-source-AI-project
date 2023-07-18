import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Conversation } from "@/models/chat";
import { PINECONE_INDEX_NAME } from "@/config/pinecone";
import { pinecone } from "@/utils/pinecone-client";

export async function POST(req) {
  
  try {
    const data = await req.json();
    // console.log("Delete Document", data.filename);
   
    //Connect to the index
    const index = pinecone.Index(PINECONE_INDEX_NAME)
    
    //Get statistics about your index.
    const indexStats = await index.describeIndexStats({
      describeIndexStatsRequest: {},
    });
    console.log("index stats ", indexStats);
    
    const deleted = await index.delete1([],true,"test(5).txt")
    console.log(" deleted namespace ", deleted)
    // await connectToDB();
         
  } catch (error) {
    return NextResponse.json("Error deleting pinecone vectors");
  }
}
