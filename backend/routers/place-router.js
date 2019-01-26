// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

const controller = require("./../controllers/place-controller");

router.route('/place')
    .get(controller.index)
    .post(controller.new);

router.route('/place/:id')
    // .get(controller.getById)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;