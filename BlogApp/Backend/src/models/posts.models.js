import { Schema, model } from "mongoose";
const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "uncategories",
    },
    coverImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2clMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const Post = model("Post", postSchema);
export default Post;
