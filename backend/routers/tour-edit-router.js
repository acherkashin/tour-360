const router = require('express').Router();
const { TourEditController } = require("./../controllers");

router.route('/tour-edit/:id')
    .post(TourEditController.startEditing);

router.route('/tour-edit/:sessionId/save').post(TourEditController.saveChanges);
router.route('/tour-edit/:sessionId/cancel').post(TourEditController.cancelChanges);
router.route('/tour-edit/:sessionId/uploadMapImage').post(TourEditController.uploadMapImage);
router.route('/tour-edit/:sessionId/mapImage').get(TourEditController.getMapImage);
module.exports = router;