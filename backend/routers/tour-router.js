const router = require('express').Router();
const { TourController } = require("./../controllers");
const { verifyToken } = require('./../utils/verify-token');

router.route('/tour')
    .get(verifyToken, TourController.getAll)
    .post(verifyToken, TourController.create);

router.route('/tour/:id')
    .get(verifyToken, TourController.getById)
    .delete(verifyToken, TourController.delete);

router.route('/tour/:id/cover')
    .post(verifyToken, TourController.uploadCover);

router.route('/tour/:id/place/:placeId')
    .get(verifyToken, TourController.getPlace);

module.exports = router;