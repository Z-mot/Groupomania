// Importation des fonctions depuis Post Model
import { getPosts, getPostById, insertPost, updatePostById, deletePostById, voted, checkVote } from "../models/postModel.js";

// Récupérer tous les Posts
export const showPosts = (req, res) => {
    getPosts((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Récupérer un seul Post 
export const showPostById = (req, res) => {
    getPostById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Création d'un Post
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

// Mise à jour du Post
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

// Vote (like ou dislike) pour un Post en vérifiant avant si l'utilisateur a déjà voté pour le Post sélectionné
export const votePost = (req, res) => {
    const data = req.body;
    // Fonction permettant de vérifer si il y a déjà eu un vote par l'utilisateur sur ce Post
    checkVote(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            if(results[0].nombre_like > 0) {
                res.json({message:"Vous avez déjà voté", error: 1});
            } else {
                // Fonction pour ajouter un vote (like ou dislike)
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


// Suppression d'un Post
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