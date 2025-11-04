import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    information: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdBy : {
      type : mongoose.Schema.Types.ObjectId,
      ref:"User",
    }
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
