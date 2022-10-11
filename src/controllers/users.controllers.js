import connection from '../database/db.js';

async function GetUsersMe(req, res) {
    try {
        //Gets all user information from shortens table
        const user = (await connection.query('select users.id, users.name, SUM(shortens.visits) AS "visitCount" from shortens JOIN users ON shortens."userId" = users.id WHERE users.id = $1 GROUP BY users.id;', [res.locals.searchToken[0].userId])).rows;
        //Gets array of all shorten urls by the user
        const shortensByUser = (await connection.query(`SELECT id, "shortenUrl" AS "shortUrl", "originalUrl" AS "url", visits AS "visitCount" FROM shortens WHERE "userId" = $1;`, [res.locals.searchToken[0].userId])).rows;
        //Creates an object to organize all the information
        const object = {
            id: user[0].id,
            name: user[0].name,
            visitCount: user[0].visitCount,
            shortenedUrls: shortensByUser
        };

        res.send(object);
    } catch (error) {
        console.log(error);
    }
};

export { GetUsersMe };