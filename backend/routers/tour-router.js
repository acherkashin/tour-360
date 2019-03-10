const router = require('express').Router();
const { TourController } = require("./../controllers");

router.route('/tour')
    .get(TourController.getAll)
    .post(TourController.create);

router.route('/tour/:id')
    .get(TourController.getById)
    .delete(TourController.delete);

router.route('/tour/:id/cover')
    .post(TourController.uploadCover);

router.route('/tour/:id/place/:placeId')
    .get(TourController.getPlace);

module.exports = router;