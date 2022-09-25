import { signup, login } from "../models/userModel.js";
/*var sha1 = ("sha1");*/
import sha1 from "sha1";
import jwt from "jsonwebtoken";

// Create New User
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
