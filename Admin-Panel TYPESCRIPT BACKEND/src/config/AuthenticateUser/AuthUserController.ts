import { Request, Response, NextFunction } from 'express';
import Joi from "joi";
import * as Jwt from "jsonwebtoken";
import AuthUserServices from './AuthUserServices';

const loginSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(3),
});

class AuthenticateUser {

    async postLogin(req: Request, res: Response) {
        try {
            console.log('req: ', req.body);
            const { email, password } = req.body;
            const validation = loginSchema.validate(req.body);
            if (validation.error) {
                return res.status(400).json({ error: validation.error.details[0].message });
            }
            const ValidatedUser = await AuthUserServices.loginValidation(email, password);
            console.log('ValidatedUser: ', ValidatedUser);

            const token = Jwt.sign(
                { userId: ValidatedUser?.user.id, email: ValidatedUser?.user.email, roleName: ValidatedUser?.roleName },
                "My@secret@key##",
                { expiresIn: "1hr" });
            console.log('Generated Token', token);

            const decodedToken = Jwt.decode(token);
            console.log('decodedToken: ', decodedToken);

            res.json({ token, decodedToken });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export default new AuthenticateUser();