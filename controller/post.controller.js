import mongoose from "mongoose";
import postModel from "../model/post.model.js";
import cloudinary from "../middleware/cloudinary.js";

export const createPost = async (req, res) => {
  try {

    const { title, information } = req.body;

    let imageUrl = "";

    if (req.file) {
      console.log("Uploading image to Cloudinary...");
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "post/image" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(error);
            }
            console.log("Cloudinary upload success:", result.secure_url);
            resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });
    }

    const userId = req.user._id;
    console.log("Creating new post for user:", userId);

    const newPost = await postModel.create({
      title,
      information,
      image: imageUrl,
      createdBy: userId,
    });

    return res.status(201).json({
      success: true,
      post: newPost,
      message: "Post Created Successfully",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating post",
      error: error.message,
    });
  }
};


export const getAllPost = async (req, res) => {
  try {
    const post = await postModel
      .find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: post,
      message: "All posts fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

export const updatePostStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Post Id" });
    }

    const post = await postModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ status: false, message: "Post Not Found" });
    }

    return res.json({ success: true, data: post });
  } catch (error) {
    return res.status(500).status({
      success: false,
      message: error.message,
    });
  }
};
