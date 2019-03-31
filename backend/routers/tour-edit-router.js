const router = require('express').Router();
const { TourEditController } = require("./../controllers");
const { verifyToken } = require('./../utils/verify-token');

router.route('/tour-edit/:id').post(verifyToken, TourEditController.startEditing);

router.route('/tour-edit/:sessionId/get')
    .get(verifyToken, TourEditController.get);
router.route('/tour-edit/:sessionId/save')
    .post(verifyToken, TourEditController.saveChanges);
router.route('/tour-edit/:sessionId/cancel')
    .post(verifyToken, TourEditController.cancelChanges);
router.route('/tour-edit/:sessionId/uploadMapImage')
    .post(verifyToken, TourEditController.uploadMapImage);
//TODO: rename pathes to /place/
router.route('/tour-edit/:sessionId/addPlace')
    .post(verifyToken, TourEditController.addPlace);
//TODO: rename pathes to /connection/
router.route('/tour-edit/:sessionId/addConnnection')
    .post(verifyToken, TourEditController.addConnection);
router.route('/tour-edit/:sessionId/removeConnection/:place1Id/:place2Id')
    .delete(verifyToken, TourEditController.deleteConnection);
router.route('/tour-edit/:sessionId/connection/:id')
    .get(verifyToken, TourEditController.getConnection)
router.route('/tour-edit/:sessionId/connection')
    .put(verifyToken, TourEditController.updateConnection);

router.route('/tour-edit/:sessionId/place/:placeId')
    .get(verifyToken, TourEditController.getPlace)
    .delete(verifyToken, TourEditController.removePlace);

router.route('/tour-edit/:sessionId/place/:placeId/sound')
    .post(verifyToken, TourEditController.uploadSound);

router.route('/tour-edit/:sessionId/place')
    .put(verifyToken, TourEditController.updatePlace);

router.route('/tour-edit/:sessionId/place/:placeId/uploadImage360')
    .post(verifyToken, TourEditController.uploadImage360);

module.exports = router;