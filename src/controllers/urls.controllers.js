import connection from '../database/db.js';
import Joi from "joi";
import { nanoid } from "nanoid";

//UrlShorten
//Schema
const urlShortenSchema = Joi.object({
    url: Joi.string().uri().min(10).required()
});

async function UrlsShorten(req, res) {
    try {
        //Body's schema validation
        await urlShortenSchema.validateAsync(req.body);

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

        //Creates the new URL with 10 characters
        const shortUrl = nanoid(10);

        //Inserts the original and shorten link in database
        await connection.query(`INSERT INTO shortens ("userId", "originalUrl", "shortenUrl") VALUES($1, $2, $3);`, [searchToken[0].userId, req.body.url, shortUrl]);

        res.status(201).send({ shortUrl: shortUrl });
    } catch (error) {
        res.status(422).send(error.details.map((detail) => detail.message));
    }
};

export { UrlsShorten };