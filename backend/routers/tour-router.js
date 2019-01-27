const router = require('express').Router();
const { TourController } = require("./../controllers");

router.route('/toure')
    .get(TourController.getAll)
    .post(TourController.create);

router.route()