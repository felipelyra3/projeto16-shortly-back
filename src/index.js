import express from "express";
import cors from 'cors';
import connection from "./database/db.js";


const server = express();
server.use(cors());
server.use(express.json());

server.get('/', async (req, res) => {
    const search = await connection.query('SELECT * FROM users;');
    res.send(search);
});

////////// Server listen //////////
server.listen(4000, () => {
    console.log("Server running on port " + 4000);
});