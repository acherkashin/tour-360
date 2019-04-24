const router = require('express').Router();
const { verifyToken } = require('./../utils/verify-token');
const { verifySession } = require('./../utils/verify-session');
const { PlaceEditController } = require('./../controllers');

router.route('/place-edit/')
    .post(verifyToken, PlaceEditController.startEditing);
router.route('/place-edit/:sessionId/get')
    .get(verifyToken, verifySession, PlaceEditController.get);
router.route('/place-edit/:sessionId/save')
    .post(verifyToken, verifySession, PlaceEditController.saveChanges);
router.route('/place-edit/:sessionId/cancel')
    .post(verifyToken, verifySession, PlaceEditController.cancelChanges);

module.exports = router;
