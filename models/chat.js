import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: { 
    type: String, 
    required: true,
    enum: ['ai', 'human'] // The sender must be either 'ai' or 'human'
  },
  message: {
    type: String,
    required: true
  }
});

const ConversationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,  
    ref: "User"
  },
  filename: {
    type: String,
    required: true,
  },
  chat: {
    type: [MessageSchema], // The chat is an array of MessageSchema
    required: true,
  },
});

export const Conversation =
  mongoose.models.Conversation ||
  mongoose.model('Conversation', ConversationSchema);
