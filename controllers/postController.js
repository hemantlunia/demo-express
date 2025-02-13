import Post from "../models/post.model.js";
import User from "../models/User.model.js";

// Create Post
const createPost = async (req, res) => {
  // console.log("create Post controller run");

  try {
    const { title, description } = req.body;
    const { id } = req.user;
    // console.log("id", id);

    if (!title || !description) {
      return res.json({
        message: `${
          !title && !description
            ? "title And description"
            : !title
            ? "Title"
            : "description"
        } Is Required !`,
        success: false,
        error: true,
        status: 400,
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.json({
        message: "user Not Found!",
        success: false,
        status: 401,
      });
    }

    const newPost = await Post.create({
      title,
      description,
      postBy: user._id,
      postByUsername:user.username,
      comment: [],
    });

    return res.json({
      message: "Post Created Successfully !",
      success: true,
      data: newPost,
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while creating Post",
      success: false,
      error: true,
      status: 500,
    });
  }
};

// Adding Comment
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const {postId} = req.params;
    const userId = req.user.id;

    if (!postId || !text) {
      return res.status(400).json({
        message: `${
          !postId && !text ? "postId And text" : !postId ? "postId" : "text"
        } Is Required !`,
        success: false,
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comment: { text, commentedBy: userId },
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ message: "Post not found!", success: false });
    }

    return res.json({
      message: "Comment added successfully!",
      success: true,
      data: updatedPost,
      status: 200,
    });
  } catch (error) {
    console.log(error.message);

    return res.json({
      message: "Error adding comment",
      success: false,
      status: 500,
    });
  }
};

// updatePost
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    // console.log("postId",postId);
    
    const { title, description } = req.body;
    const userId = req.user?.id;
    // console.log("userId",userId);
    

    if (!postId) {
      return res.json({
        message: "postId not found, Try again!",
        success: false,
        status: 401,
      });
    }
    if (!userId) {
      return res.json({
        message: "userId not found to update...!",
        success: false,
        status: 401,
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.json({
        message: "Post Not found...!",
        success: false,
        status: 401,
      });
    }

    if (post.postBy.toString() !== userId) {
      return res.json({
        message: "You are not authorized to update this post!",
        success: false,
        status: 403,
      });
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: updateFields },
      { new: true }
    );

    return res.json({
      message: "Post updated successfully...!",
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while updating the post!",
      success: false,
      status: 500,
    });
  }
};

// delete Post
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user?.id;

    if (!postId) {
      return res.json({
        message: "postId not found, Try again!",
        success: false,
        status: 401,
      });
    }
    if (!userId) {
      return res.json({
        message: "userId not found to delete...!",
        success: false,
        status: 401,
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.json({
        message: "Post Not found...!",
        success: false,
        status: 401,
      });
    }
    console.log("ok1");
    
    console.log("postId deleting controll",post);
    console.log("ok2");
    
    if (post.postBy.toString() !== userId) {
      return res.json({
        message: "You are not authorized to Delete this post!",
        success: false,
        status: 403,
      });
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    return res.json({
      message: "Post delete successfully...!",
      success: true,
      data: deletedPost,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while deleting the post!",
      success: false,
      status: 500,
    });
  }
};

// All Post find
const allPosts = async (req, res) => {
  try {
    const userId  = req.user.id;
    if (!userId) {
      return res.json({
        message: "user Not found, Please Login...!",
        success: false,
        status: 403,
      });
    }
    const allPost = await Post.find();
    if (allPost.length === 0) {
      return res.json({
        message: "No one Creating post Yet, please create a post...!",
        success: false,
        status: 400,
      });
    }

    return res.json({
      message: allPost,
      success: true,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while finding all posts...!",
      success: false,
      status: 500,
    });
  }
};

// searchPostby Title/description
const searchPost = async (req, res) => {
  try {
    const { searchValue } = req.body;

    if (!searchValue) {
      return res.json({
        message: "Search text is required...",
        success: false,
        status: 403,
      });
    }

    const searchedPost = await Post.find({ $text: { $search: searchValue } });
    if (searchedPost.length === 0) {
      return res.json({
        message: "No matching post found...",
        success: false,
        status: 401,
      });
    }

    return res.json({
      message: "matching posts found...",
      success: true,
      data: searchedPost,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while searching the posts...!",
      success: false,
      status: 500,
    });
  }
};

export { createPost, addComment, updatePost, deletePost, allPosts, searchPost };
