const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const config = require('./../config');
const { validateForm } = require('../utils/validate');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err });
        } else {
            const validation = validateForm({ 
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash 
            });
            if (!validation.isValid) {
                return res.status(400).json({ error: validation.error });
            };

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash
            });
            user.save().then((result) => {
                res.status(200).json({ user: user.toClient() });
            }).catch(error => {
                res.status(500).json({ error });
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
                    return res.status(401).json({ error: 'Unauthorized Access' });
                }
                if (result) {
                    const token = createToken(user);
                    return res.status(200).json({
                        user: user.toClient(),
                        token,
                    });
                }
                return res.status(401).json({ error: 'Unauthorized Access' });
            });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

exports.getUserById = (req, res) => {
    const { id } = req.params;

    if (id == null) {
        res.status(400).json({ error: "id should be provided" });
    }

    User.findById(id)
        .then(user => {
            return res.json({ user: user.toClient() });
        })
        .catch(error => {
            return res.status(500).json({ error });
        });
};

function createToken(user) {
    const token = jwt.sign({
        id: user._id,
        email: user.email,
    }, config.SECRET_KEY,
        {
            expiresIn: '24h'
        });

    return token;
}
