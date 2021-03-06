import { compare } from 'bcrypt';
import { UserRepository } from './../repositories/user-repository';
import { UserModel } from '../models/index';
import { createToken } from '../utils/tokenutils';
import { validateForm, validName, validEmail } from '../utils/validate';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from 'http-status-codes';
import GoogleRecaptcha from 'google-recaptcha';
import { RECAPTCHA_SECRET_KEY } from '../config';

const googleRecaptcha = new GoogleRecaptcha({ secret: RECAPTCHA_SECRET_KEY });

export function signup(req, res) {
    UserModel.findOne({ email: req.body.user.email }).then((existedUser) => {
        if (existedUser) {
            return res.status(BAD_REQUEST).json({ message: 'Error is occured during registering' });
        }

        const validation = validateForm({
            email: req.body.user.email,
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            password: req.body.user.password,
        });

        if (!validation.isValid) {
            return res.status(BAD_REQUEST).json({ error: validation.error });
        }

        googleRecaptcha.verify({ response: req.body.ReCAPTCHAValue }, (error) => {
            if (error) {
                return res.status(BAD_REQUEST).json({ message: 'You are not human' });
            }

            new UserRepository().createUser({
                email: req.body.user.email,
                firstName: req.body.user.firstName,
                lastName: req.body.user.lastName,
                password: req.body.user.password,
            }).then((newUser) => {
                return res.status(OK).json({ user: newUser.toClient() });
            }).catch(error => {
                return res.status(INTERNAL_SERVER_ERROR).json({ error });
            });
        });
    });
}

export function signin(req, res) {
    googleRecaptcha.verify({ response: req.body.ReCAPTCHAValue }, (error) => {
        if (error) {
            return res.status(BAD_REQUEST).json({ error: 'You are not human' });
        }

        UserModel.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    return res.state(BAD_REQUEST).json({ error: 'Error occured during login' });
                }

                compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(UNAUTHORIZED).json({ error: 'Unauthorized Access' });
                    }
                    if (result) {
                        const token = createToken(user);
                        return res.status(OK).json({
                            user: user.toClient(),
                            token,
                        });
                    }
                    return res.status(UNAUTHORIZED).json({ error: 'Unauthorized Access' });
                });
            })
            .catch(error => {
                return res.status(INTERNAL_SERVER_ERROR).json({ error });
            });
    });
}

export function editUser(req, res) {
    UserModel.findOne({ _id: req.userId })
        .then((user) => {
            if (user) {
                const { email, firstName, lastName, language } = req.body;

                const emailValidation = validEmail(email);
                const firstNameValidation = validName(firstName);
                const lastNameValidation = validName(lastName);

                if (emailValidation.valid && firstNameValidation.valid && lastNameValidation.valid) {
                    user.email = email;
                    user.firstName = firstName;
                    user.lastName = lastName;
                    user.language = language;
                    user.save();

                    res.status(OK)
                        .json({
                            user: user.toClient(),
                        });
                } else {
                    res.status(BAD_REQUEST).json({
                        emailError: emailValidation.error,
                        firstNameError: firstNameValidation.error,
                        lastNameError: lastNameValidation.error,
                    });
                }
            } else {
                res.status(BAD_REQUEST).json({ message: 'Error is occured during editing' });
            }
        })
        .catch(error => {
            res.status(INTERNAL_SERVER_ERROR).json({ error });
        });
}

export function getUserById(req, res) {
    const { id } = req.params;

    if (id == null) {
        res.status(BAD_REQUEST).json({ error: 'id should be provided' });
    }

    UserModel.findById(id)
        .then(user => {
            return res.json({ user: user.toClient() });
        })
        .catch(error => {
            return res.status(INTERNAL_SERVER_ERROR).json({ error });
        });
}
