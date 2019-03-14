const router = require('express').Router();
const { TourEditController } = require("./../controllers");

router.route('/tour-edit/:id').post(TourEditController.startEditing);

router.route('/tour-edit/:sessionId/get').get(TourEditController.get);
router.route('/tour-edit/:sessionId/save').post(TourEditController.saveChanges);
router.route('/tour-edit/:sessionId/cancel').post(TourEditController.cancelChanges);
router.route('/tour-edit/:sessionId/uploadMapImage').post(TourEditController.uploadMapImage);
router.route('/tour-edit/:sessionId/addPlace').post(TourEditController.addPlace);
router.route('/tour-edit/:sessionId/addConnnection').post(TourEditController.addConnection);

router.route('/tour-edit/:sessionId/place/:placeId')
    .get(TourEditController.getPlace)
    .delete(TourEditController.removePlace);

router.route('/tour-edit/:sessionId/place')
    .put(TourEditController.updatePlace);

router.route('/tour-edit/:sessionId/place/:placeId/uploadImage360')
    .post(TourEditController.uploadImage360);

module.exports = router;