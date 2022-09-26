import express from'express';

import Router from "./routes/routes.js";

const app = express();

//utilisation d'un middleware permettant de contourner les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/*utilisation de la méthode app.use prenant en paramètre le middleware express.json afin
de rendre disponible le body directement dans l'objet req pour toute les requêtes ayant
un content-type : application/json*/
app.use(express.json());

// use router
app.use(Router);


export default app;
