import connection from '../database/db.js';
import Joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

//SignUp
//Schema
const signUpSchema = Joi.object({
    name: Joi.string().empty().max(200).required(),
    email: Joi.string().empty().email().max(200).required(),
    password: Joi.string().empty().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.string().empty().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

async function SignUp(req, res) {
    try {
        //Body's schema validation
        await signUpSchema.validateAsync(req.body);

        //Verifies if email already exists
        const searchEmail = (await connection.query('SELECT * FROM users WHERE email = $1;', [req.body.email])).rows;
        if (searchEmail.length > 0) {
            res.status(409).send('This e-mail already exists');
            return;
        }

        //Encrypts the password
        const hashPassword = bcrypt.hashSync(req.body.password, 10);

        //Insets the user in database
        await connection.query(`INSERT INTO users (name, email, password) values($1, $2, $3)`, [req.body.name, req.body.email, hashPassword]);

        res.sendStatus(201);
    } catch (error) {
        res.status(422).send(error.details.map((detail) => detail.message));
    }
}

//SignIn
//Schema
const signInSchema = Joi.object({
    email: Joi.string().empty().email().max(200).required(),
    password: Joi.string().empty().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
async function SignIn(req, res) {
    try {
        //Body's schema validation
        await signInSchema.validateAsync(req.body);

        //Verifies if email already exists
        const searchEmail = (await connection.query(`SELECT * FROM users WHERE email = $1;`, [req.body.email])).rows;
        if (searchEmail.length === 0) {
            res.sendStatus(401);
            return;
        }

        //Verifies if the passwords match
        const compare = bcrypt.compareSync(req.body.password, searchEmail[0].password);
        if (compare) {
            const token = uuidv4();
            await connection.query(`INSERT INTO sessions ("userId", token) VALUES($1, $2);`, [searchEmail[0].id, token]);
            res.status(200).send({ token: token });
            //res.status(200).send({ token });
            return;
        } else {
            res.sendStatus(401);
            return;
        }
    } catch (error) {
        res.status(422).send(error.details.map((detail) => detail.message));
        console.log(error);
    }
};

async function SignOut(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    await connection.query('DELETE FROM sessions WHERE token = $1;', [token]);
    res.sendStatus(200);
}

async function SignOutAll(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = (await connection.query('SELECT "userId" FROM sessions WHERE token = $1', [token])).rows;
    await connection.query('DELETE FROM sessions WHERE "userId" = $1', [userId[0].userId]);
    res.sendStatus(200);
}

export { SignUp, SignIn, SignOut, SignOutAll };