import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true
  },
  file: {
    data: Buffer,
    contentType: String,
    // required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Document = mongoose.models.Document || mongoose.model('Document', DocumentSchema);

