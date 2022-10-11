import connection from '../database/db.js';

async function GetRanking(req, res) {
    try {
        const ranking = (await connection.query(`SELECT users.id, users.name, COUNT(shortens."shortenUrl") AS "linksCount", SUM(shortens.visits) AS "visitCount" FROM shortens JOIN users ON shortens."userId" = users.id GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;`)).rows;
        res.status(200).send(ranking);
    } catch (error) {
        console.log(error);
    }
};

export { GetRanking };