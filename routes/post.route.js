import express from "express";
import { addComment, allPosts, createPost, deletePost, searchPost, updatePost } from "../controllers/postController.js";
import { validateresult, validationFields } from "../utils/inputValidations.js";

const postRoute = express.Router();

postRoute.post("/createPost",validationFields(["title","description"]),validateresult,createPost);
postRoute.post("/addComment",addComment);
postRoute.put("/updatePost/:postId",updatePost);
postRoute.delete("/deletePost/:postId",deletePost);
postRoute.get("/allPosts",allPosts)
postRoute.get("/search",searchPost)

export default postRoute;



// "postId":"67ad9c70772085eb17834182"