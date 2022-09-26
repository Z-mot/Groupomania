// Importation de mysql pour pouvoir connecter le backend à la BDD
import mysql from "mysql";

// Création de la connexion avec la BDD
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'groupomania'
});

export default db;