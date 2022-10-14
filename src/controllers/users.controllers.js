import connection from '../database/db.js';

async function GetUsersMe(req, res) {
    try {
        console.log(res.locals.searchToken[0].userId)
        //Gets all user information from shortens table
        const user = (await connection.query('select users.id, users.name, SUM(shortens.visits) AS "visitCount" from shortens JOIN users ON shortens."userId" = users.id WHERE users.id = $1 GROUP BY users.id;', [res.locals.searchToken[0].userId])).rows;
        //Verifies if the user has no shorten links and send it as zero
        console.log(user);
        if (user.length === 0) {
            const userWithNoLinks = (await connection.query('SELECT * FROM users WHERE id = $1;', [res.locals.searchToken[0].userId])).rows;
            const object = {
                id: userWithNoLinks[0].id,
                name: userWithNoLinks[0].name,
                visitCount: 0,
                shortenedUrls: []
            };
            res.status(200).send(object);
        }

        //Gets array of all shorten urls by the user
        const shortensByUser = (await connection.query(`SELECT id, "shortenUrl" AS "shortUrl", "originalUrl" AS "url", visits AS "visitCount" FROM shortens WHERE "userId" = $1;`, [res.locals.searchToken[0].userId])).rows;
        //Creates an object to organize all the information
        const object = {
            id: user[0].id,
            name: user[0].name,
            visitCount: user[0].visitCount,
            shortenedUrls: shortensByUser
        };

        //console.log(search);
        console.log(user);

        res.status(200).send(object);
    } catch (error) {
        console.log(error);
    }
};

export { GetUsersMe };