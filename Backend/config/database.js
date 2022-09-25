import mysql from "mysql";

// create the connection to database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'groupomania'
});

export default db;