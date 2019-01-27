const router = require('express').Router();
const { TourController } = require("./../controllers");

router.route('/tour')
    .get(TourController.getAll)
    .post(TourController.create);

module.exports = router;