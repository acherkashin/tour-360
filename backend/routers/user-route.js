const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

router.post('/signup', (req, res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err });
        } else {
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
});

router.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                if (result) {
                    const JWTToken = jwt.sign({
                        email: user.email,
                        _id: user._id
                    },
                        'secret',
                        {
                            expiresIn: '24h'
                        });
                    return res.status(200).json({
                        success: 'Welcome to the JWT Auth',
                        token: JWTToken
                    });
                }
                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});

module.exports = router;