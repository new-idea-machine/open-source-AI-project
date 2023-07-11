import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    enum: ["ai", "human"], // The sender must be either 'ai' or 'human'
  },
  message: {
    type: String,
    required: true,
  },
});

const ConversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  filename: {
    type: String,
    required: true,
  },
  chat: {
    type: [MessageSchema], // The chat is an array of MessageSchema
    required: true,
  },
  document: {
    type:[DocumentSchema],
    required:true
  }
});



export const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema);
