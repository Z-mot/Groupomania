// Import function from Post Model
import { getPosts, getPostById, insertPost, updatePostById, deletePostById, voted, checkVote } from "../models/postModel.js";

// Get All Posts
export const showPosts = (req, res) => {
    getPosts((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Single Post 
export const showPostById = (req, res) => {
    getPostById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Create New Post
export const createPost = (req, res) => {
    const data = req.body;
    insertPost(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Post
export const updatePost = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updatePostById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Vote Post
export const votePost = (req, res) => {
    const data = req.body;
    checkVote(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            if(results[0].nombre_like > 0) {
                res.json({message:"Vous avez déjà voté", error: 1});
            } else {
                voted(data, (err, results) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({ message: "Le vote a été pris en compte", error: 0 });
                    }
                });
            }
        }
    });
}

export const like = (req, res) => {
    countLike((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const dislike = (req, res) => {
    countDislike((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Post
export const deletePost = (req, res) => {
    const id = req.params.id;
    deletePostById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}