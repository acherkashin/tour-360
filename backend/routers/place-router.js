const router = require('express').Router();
const { PlaceContoller } = require("./../controllers");

router.route('/place')
    .get(PlaceContoller.getAll)
    .post(PlaceContoller.create);

router.route('/place/:id')
    .get(PlaceContoller.getById)
    .put(PlaceContoller.update)
    .delete(PlaceContoller.delete);

module.exports = router;