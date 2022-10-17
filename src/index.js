import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import connection from "./database/db.js";
import Sign from "./routers/sign.routers.js";
import Urls from "./routers/urls.routers.js";
import Users from "./routers/users.routers.js";
import Ranking from "./routers/ranking.routers.js";
dotenv.config();


const server = express();
server.use(cors());
server.use(express.json());

////////// Urls //////////
server.use(Urls);

////////// SignIn & SignUp //////////
server.use(Sign);

////////// Users //////////
server.use(Users);

////////// Ranking //////////
server.use(Ranking);

/* server.get('/', async (req, res) => {
    const search = (await connection.query('SELECT * FROM users;')).rows;
    res.send(search);
}); */

////////// Server listen //////////
server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});