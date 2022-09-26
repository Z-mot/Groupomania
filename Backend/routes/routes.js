// importation express
import express from "express";

// importation des fonctions des controllers
import { showPosts, showPostById, createPost, updatePost, deletePost, votePost } from "../controllers/post.js";
import { createUser, loginUser } from '../controllers/user.js';
import { auth } from '../middlewares/auth.js';

// initialisation express router
const router = express.Router();

// Récupérer tous les Post
router.get('/posts', auth, showPosts);

// Récupérer un seul Post
router.get('/posts/:id', auth, showPostById);

// Créé un Post
router.post('/posts', auth, createPost);

//Voter pour un Post
router.post('/posts/vote', auth, votePost);

// Mettre à jour Post
router.put('/posts/:id', auth, updatePost);

// Supprimer Post
router.delete('/posts/:id', auth, deletePost);

// Inscription
router.post('/signup', createUser);

// Connexion
router.post('/login', loginUser);

//exportation des routes afin qu'elles soient utilisées dans d'autres fichiers
export default router;