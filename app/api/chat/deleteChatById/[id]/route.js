import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { Conversation } from "@/models/chat";

export async function DELETE(req, context) {
  try {
    await connectToDB();
    let id = context.params.id;
        
      // find conversation with given ID
      const conversation = await Conversation.findOne({
        _id: id,
      });
      // console.log(conversation)
      if(conversation.chat.length == 0){
        console.log("Chat is empty");
      } 
      else {
        const deletedChat = conversation.chat.splice(0,conversation.chat.length);
        await conversation.save();
        return NextResponse.json("Message deleted successfully");
      }
       } catch (error) {
     return NextResponse.json("Error connecting to Database");
  }
}
