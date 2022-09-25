// import connection
import db from "../config/database.js";

// Get All Posts
export const getPosts = (result) => {
    db.query("SELECT a.*,(SELECT COUNT(reactions_id) FROM reactions b WHERE a.post_id = b.post_id AND vote = 1) nombre_like,(SELECT COUNT(reactions_id) FROM reactions b WHERE a.post_id = b.post_id AND vote = -1) nombre_dislike FROM post a ORDER BY a.post_id DESC", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Post
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

// Insert Post to Database
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

// Update Post to Database
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

// Add vote to Database
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

export const checkVote = (data, result) => {
    db.query("SELECT COUNT(reactions_id) AS nombre_like FROM reactions WHERE post_id = ? AND user_id = ? AND vote <> 0", [data.post_id, data.user_id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            if (results[0].nombre_like > 0) {
                db.query("UPDATE reactions SET vote = 0 WHERE post_id = ? AND user_id = ?", [data.post_id, data.user_id], (err, results1) => {
                });
            } 
            result(null, results);
        }
    });
}


// Delete Post to Database
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
