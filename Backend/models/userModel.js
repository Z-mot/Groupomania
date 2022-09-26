// importation connexion à la BDD
import db from "../config/database.js";



// Inscription
export const signup = (data, result) => {
    db.query("INSERT INTO user SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}


// Connexion
export const login = (email, password, result) => {
    db.query("SELECT * FROM user WHERE email = ? and password = ?", [email, password], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}


