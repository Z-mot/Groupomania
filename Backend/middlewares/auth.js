//importation de jsonwebtoken permettant de générer et décoder les tokens
import jwt from "jsonwebtoken";

//exportation du middleware permettant la vérification du token utilisateur
export const auth = (req, res, next) => {
    //code à exécuter
    try {
        //récupération du token dans le header en enlevant le mot clé "bearer"
        const token = req.headers.authorization.split(" ")[1];
        //décodage du token grâce à la fonction verify de jsonwebtoken à l'aide du mot secret
        const decodedToken = jwt.verify(token, "YOU_NEVER_FIND_IT");
        //assignation de l'email du token décodé à une constante
        const email = decodedToken.email;
        const statut = decodedToken.statut;
        const user_id = decodedToken.user_id;
        /*ajout de l'email provenant du token à l'objet request afin 
        qu'il soit exploitable par toutes les routes*/
        req.auth = { email: email , statut: statut, user_id: user_id};
        //si tout se passe bien, fonction next pour continuer l'exécution du code
        next();
        //exception (erreur)
    } catch (error) {
        res.status(403).json({ error });
    }
};