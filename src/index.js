import express from "express";
import cors from 'cors';
import connection from "./database/db.js";
import Sign from "./routers/sign.routers.js";
import Urls from "./routers/urls.routers.js";
import Users from "./routers/users.routers.js";
import Ranking from "./routers/ranking.routers.js";


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

server.get('/', async (req, res) => {
    const search = (await connection.query('SELECT * FROM users;')).rows;
    res.send(search);
});

////////// Server listen //////////
server.listen(4000, () => {
    console.log("Server running on port " + 4000);
});