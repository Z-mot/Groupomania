// importation des fonctions depuis userModel
import { signup, login } from "../models/userModel.js";
// importation de SHA1 pour encoder le mot de passe
import sha1 from "sha1";
//importation de jsonwebtoken permettant de générer et décoder les tokens
import jwt from "jsonwebtoken";

// Créer un nouvel utilisateur User avec encodage du mot de passe
export const createUser = (req, res) => {
    const data = req.body;
    data.password = sha1(data.password);
    signup(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Connexion d'un utilisateur avec vérification du mot de passe et création d'un token
export const loginUser = (req, res) => {
    const data = req.body;
    data.password = sha1(data.password);
    login(data.email, data.password, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                statut: results[0].status,
                user_id: results[0].user_id,
                email: data.email,
                authorization: jwt.sign(
                    { email: data.email },
                    "YOU_NEVER_FIND_IT",
                    { expiresIn: "8h" }
                )
            });
        }
    });

}
