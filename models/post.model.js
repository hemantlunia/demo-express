import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    comment: [
        {
            text:{type:String,required:true},
            commentedBy:{type:mongoose.Types.ObjectId,ref:"User"},
            postedAt:{type:Date,default:Date.now}

        }
    ],
    postBy: { type: mongoose.Types.ObjectId,ref:"User",required:true },
    postByUsername:{type:String,required:true}
  },
  { timestamps: true }
);

// creating indexs on title and description for searching
postSchema.index({title:"text"});

const Post = mongoose.model("Post", postSchema);

export default Post;
