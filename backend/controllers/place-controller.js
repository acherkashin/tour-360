const { Place } = require('./../models');

exports.getAll = (req, res) => {
    Place.find((err, places) => {
        if (err) {
            return res.json({ success: false, error: err });
        }
        return res.json({ success: true, result: places });
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;

    if (id == null) {
        res.json({ success: false, error: "id should be provided" });
    }

    Place.findById(id)
        .then(result => res.json({ success: true, result }))
        .catch(error => res.json({ success: false, error }));
};

exports.update = (req, res) => {
    const { id, update } = req.body;
    Place.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

exports.delete = (req, res) => {
    const { id } = req.body;
    Place.findOneAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
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

    const place = new Place({
        name
    });

    place.save(err => {
        if (err) {
            return res.json({ success: false, error: err });
        } else {
            return res.json({ success: true });
        }
    });
};