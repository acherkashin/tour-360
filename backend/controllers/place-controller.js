const { Place } = require('./../models');

// "/place/get"
exports.index = (req, res) => {
    Place.find((err, places) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, places });
    });
};

// "/place/update"
exports.update = (req, res) => {
    const { id, update } = req.body;
    Place.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

// "/place/delete"
exports.delete = (req, res) => {
    const { id } = req.body;
    Place.findOneAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
};

// "/place/create"
exports.new = (req, res) => {
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