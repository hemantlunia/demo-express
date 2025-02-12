import express from "express";
import { addComment, allPosts, createPost, deletePost, searchPost, updatePost } from "../controllers/postController.js";

const postRoute = express.Router();

postRoute.post("/createPost",createPost);
postRoute.post("/addComment",addComment);
postRoute.put("/updatePost/:postId",updatePost);
postRoute.delete("/deletePost/:postId",deletePost);
postRoute.get("/allPosts",allPosts)
postRoute.get("/search",searchPost)

export default postRoute;