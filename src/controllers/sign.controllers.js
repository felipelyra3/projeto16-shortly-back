import connection from '../database/db.js';
import Joi from "joi";
import bcrypt from "bcrypt";

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

export { SignUp };