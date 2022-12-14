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

async function GetUrlsById(req, res) {
    try {
        //Verifies if ID is a number
        if (isNaN(req.params.id)) {
            res.sendStatus(404);
            return;
        }

        //Searches the url in database
        const searchUrl = (await connection.query(`SELECT id, "shortenUrl" AS  "shortUrl", "originalUrl" AS "url" FROM shortens WHERE id = $1;`, [req.params.id])).rows;

        //Verifies if the URL exists (by id)
        if (searchUrl.length === 0) {
            res.sendStatus(404);
            return;
        }

        res.send(searchUrl);
    } catch (error) {
        console.log(error);
    }
};

async function GetUrlsOpenShortenUrl(req, res) {
    try {
        //Searches the url in database
        const searchUrl = (await connection.query(`SELECT * FROM shortens WHERE "shortenUrl" = $1;`, [req.params.shortUrl])).rows;

        //Verifies if the URL exists (by shortenUrl)
        if (searchUrl.length === 0) {
            res.sendStatus(404);
            return;
        }

        //Increments visits number
        let increment = searchUrl[0].visits + 1;
        await connection.query(`UPDATE shortens SET visits = $1 WHERE "shortenUrl" = $2;`, [increment, req.params.shortUrl]);

        res.redirect(searchUrl[0].originalUrl);
    } catch (error) {
        console.log(error);
    }
};

async function DeleteUrlsById(req, res) {
    try {
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

        //Verifies if ID (req.params.id) is a number
        if (isNaN(req.params.id)) {
            res.sendStatus(404);
            return;
        }

        //Searches the url in database
        const searchUrl = (await connection.query(`SELECT * FROM shortens WHERE id = $1;`, [req.params.id])).rows;

        //Verifies if the URL exists (by shortenUrl)
        if (searchUrl.length === 0) {
            res.sendStatus(404);
            return;
        }

        //Searches the url in database by id and user
        const searchUrlByUser = (await connection.query(`SELECT * FROM shortens WHERE id = $1 AND "userId" = $2;`, [req.params.id, searchToken[0].userId])).rows;

        //Verifies if the URL exists (by shortenUrl)
        if (searchUrlByUser.length === 0) {
            res.sendStatus(401);
            return;
        }

        await connection.query(`DELETE FROM shortens WHERE id = $1;`, [req.params.id]);

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
    }
};

export { UrlsShorten, GetUrlsById, GetUrlsOpenShortenUrl, DeleteUrlsById };