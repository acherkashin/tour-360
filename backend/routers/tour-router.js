const router = require('express').Router();
const { TourController } = require("./../controllers");

router.route('/tour')
    .get(TourController.getAll)
    .post(TourController.create);

router.route('/tour/:id')
    .get(TourController.getById);

router.route('/tour/:id/cover')
    .post(TourController.uploadCover);

module.exports = router;