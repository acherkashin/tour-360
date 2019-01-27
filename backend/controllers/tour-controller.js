const { Tour } = require('./../models');

exports.getAll = (req, res) => {
    Tour.find((err, tours) => {
        if (err) {
            return res.json({ success: false, error: err });
        }
        return res.json({ success: true, tours });
    });
};

exports.create = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.json({
            success: false,
            error: "Name should be provided"
        });
    }

    const tour = new Tour({
        name
    });

    tour.save(err => {
        if (err) {
            return res.json({ success: false, error: err });
        } else {
            return res.json({ success: true });
        }
    });
};
