const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('../models/index');
const { createToken } = require('./../utils/tokenutils');
const { validateForm, validName, validEmail } = require('../utils/validate');
const HttpStatus = require('http-status-codes');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
        } else {
            const validation = validateForm({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash
            });
            if (!validation.isValid) {
                return res.status(HttpStatus.BAD_REQUEST).json({ error: validation.error });
            };

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash
            });
            user.save().then((result) => {
                res.status(HttpStatus.OK).json({ user: user.toClient() });
            }).catch(error => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Unauthorized Access' });
                }
                if (result) {
                    const token = createToken(user);
                    return res.status(HttpStatus.OK).json({
                        user: user.toClient(),
                        token,
                    });
                }
                return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Unauthorized Access' });
            });
        })
        .catch(error => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
        });
};

exports.editUser = (req, res) => {
    User.findOne({ _id: req.userId })
        .then((user) => {
            if (user) {
                const { email, firstName, lastName } = req.body;

                const emailValidation = validEmail(email);
                const firstNameValidation = validName(firstName);
                const lastNameValidation = validName(lastName);

                if (emailValidation.valid && firstNameValidation.valid && lastNameValidation.valid) {
                    user.email = email;
                    user.firstName = firstName;
                    user.lastName = lastName;
                    user.save();

                    return res.status(HttpStatus.OK)
                        .json({
                            user: user.toClient(),
                        });
                } else {
                    res.status(HttpStatus.BAD_REQUEST).json({
                        emailError: emailValidation.error,
                        firstNameError: firstNameValidation.error,
                        lastNameError: lastNameValidation.error,
                    });
                }
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ message: "Error is occured during editing" });
            }
        })
        .catch(error => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
        });
};

exports.getUserById = (req, res) => {
    const { id } = req.params;

    if (id == null) {
        res.status(HttpStatus.BAD_REQUEST).json({ error: "id should be provided" });
    }

    User.findById(id)
        .then(user => {
            return res.json({ user: user.toClient() });
        })
        .catch(error => {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
        });
};
