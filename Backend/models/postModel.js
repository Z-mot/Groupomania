// importation connexion à la BDD
import db from "../config/database.js";

// Récupérer tous les Posts avec leurs nombres de like/dislike
export const getPosts = (result) => {
    db.query("SELECT a.*,(SELECT COUNT(reactions_id) FROM reactions b WHERE a.post_id = b.post_id AND vote = 1) nombre_like, (SELECT COUNT(reactions_id) FROM reactions b WHERE a.post_id = b.post_id AND vote = -1) nombre_dislike FROM post a ORDER BY a.post_id DESC", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Récupérer un seul Post
export const getPostById = (id, result) => {
    db.query("SELECT * FROM post WHERE post_id = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Créé un Post dans la BDD
export const insertPost = (data, result) => {
    db.query("INSERT INTO post SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Mettre à jour le Post dans la BDD
export const updatePostById = (data, id, result) => {
    db.query("UPDATE post SET post_name = ? ,post_image =?, user_id =? WHERE post_id = ?", [data.post_name, data.post_image, data.user_id, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Ajouter un vote pour un Post dans la BDD
export const voted = (data, result) => {
    db.query("INSERT INTO reactions(user_id, post_id, vote) VALUES (?,?,?)", [data.user_id, data.post_id, data.vote], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Vérification pour le Post si l'Utilisateur a déjà voté
export const checkVote = (data, result) => {
    // On vérifie si pour cette utilisateur sur ce post il y a déjà eu un vote
    db.query("SELECT COUNT(reactions_id) AS nombre_like FROM reactions WHERE post_id = ? AND user_id = ? AND vote <> 0", [data.post_id, data.user_id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            // Si il y a déjà eu un vote alors on remet le vote de cette utilisateur sur ce post à 0
            if (results[0].nombre_like > 0) {
                db.query("UPDATE reactions SET vote = 0 WHERE post_id = ? AND user_id = ?", [data.post_id, data.user_id], (err, results1) => {
                });
            } 
            result(null, results);
        }
    });
}


// Supprimer Post
export const deletePostById = (id, result) => {
    db.query("DELETE FROM post WHERE post_id = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
