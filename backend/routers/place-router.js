const router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

const { PlaceContoller } = require("./../controllers");

router.route('/place')
    .get(PlaceContoller.getAll)
    .post(PlaceContoller.create);

router.route('/place/:id')
    // .get(PlaceContoller.getById)
    .put(PlaceContoller.update)
    .delete(PlaceContoller.delete);

module.exports = router;