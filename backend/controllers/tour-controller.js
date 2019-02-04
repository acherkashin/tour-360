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

exports.uploadCover = (req, res) => {
    const { id } = req.params;
    if (id == null) {
        res.json({ success: false, error: "id should be provided" });
    }

    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const cover = req.files.cover;
    Tour.update({ _id: id }, {
        $set: {
            image: {
                data: cover.data,
                contentType: cover.mimetype,
            }
        }
    }).then(() => {
        return res.json({ success: true });
    }).catch((err) => {
        return res.json({ success: false, error: err });
    });
};

exports.getCoverById = (req, res) => {
    const { id } = req.params;

    if (id == null) {
        res.json({ success: false, error: "id should be provided" });
    }

    Tour.findById(id)
        .then(tour => {
            return res.end(tour.image.data, 'binary');
        })
        .catch(error => {
            return res.json({ success: false, error });
        });
};
