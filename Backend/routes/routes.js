// import express
import express from "express";

// import function from controller
import { showPosts, showPostById, createPost, updatePost, deletePost, votePost } from "../controllers/post.js";
import { createUser, loginUser } from '../controllers/user.js';
import { auth } from '../middlewares/auth.js';

// init express router
const router = express.Router();

// Get All Post
router.get('/posts', auth, showPosts);

// Get Single Post
router.get('/posts/:id', auth, showPostById);

// Create New Post
router.post('/posts', auth, createPost);

//Vote on Post
router.post('/posts/vote', auth, votePost);

// Update Post
router.put('/posts/:id', auth, updatePost);

// Delete Post
router.delete('/posts/:id', auth, deletePost);

// Signup
router.post('/signup', createUser);

// Login
router.post('/login', loginUser);

// export default router
export default router;