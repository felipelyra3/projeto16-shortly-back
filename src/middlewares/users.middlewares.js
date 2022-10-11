import connection from '../database/db.js';

async function UserAuthentication(req, res, next) {
    //Validate if authorization on headers exists
    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }

    //Validates if the sessions exists
    const token = req.headers.authorization?.replace('Bearer ', '');
    const searchToken = (await connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token])).rows;
    if (searchToken.length === 0) {
        res.sendStatus(401);
        return;
    }

    res.locals.searchToken = searchToken;

    next();
}

export default UserAuthentication;