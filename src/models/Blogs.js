import mongoose from 'mongoose';

const blogsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},{
  timestamps: true
});

// compound index to ensure that a user can't have multiple blogs with the same title
blogsSchema.index({ user: 1, title: 1 }, { unique: true });

export default mongoose.model("Blog", blogsSchema);
