const { Tour } = require('./../models');

exports.getAll = (req, res) => {
    Tour.find().then((tours) => {
        return res.json({ success: true, result: tours });
    }).catch(err => {
        return res.json({ success: false, error: err });
    })
};

exports.getById = (req, res) => {
    const { id } = req.params;

    if (id == null) {
        res.json({ success: false, error: "id should be provided" });
    }

    Tour.findById(id)
        .then(result => {
            return res.json({ success: true, result });
        })
        .catch(error => {
            return res.json({ success: false, error });
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

    tour.save().then(() => {
        return res.json({ success: true });
    }).catch((err) => {
        return res.json({ success: false, error: err });
    });
};
