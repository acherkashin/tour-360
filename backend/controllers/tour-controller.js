const { Tour } = require('./../models');
const path = require('path');
const uuidv1 = require('uuidv1')
const { addFile, removeFile } = require('./../utils/fileutils');

exports.getAll = (req, res) => {
    Tour.find().then((tours) => {
        const result = tours.map(tour => tour.toClient());
        return res.json({ result });
    }).catch(err => {
        return res.json({ error: err });
    })
};

exports.getById = (req, res) => {
    const { id } = req.params;

    if (id == null) {
        res.status(400).json({ error: "id should be provided" });
    }

    Tour.findById(id)
        .then(tour => {
            const result = tour.toClient();
            return res.json({ result });
        })
        .catch(error => {
            return res.status(500).json({ error });
        });
};

exports.getPlace = (req, res) => {
    const { id, placeId } = req.params;

    if (id == null) {
        req.status(400).send("id should be provided");
    } else if (placeId == null) {
        req.status(400).send("placeId should be provided");
    }

    Tour.findById(id)
        .then(tour => {
            const index = tour.places.findIndex((value) => value.id === placeId);
            const place = tour.places[index].toClient();

            return res.json({ place })
        });
};

exports.create = (req, res) => {
    const { name, mapType } = req.body;

    if (!name) {
        return res.json({ error: "Name should be provided" });
    }

    const tour = new Tour({
        name,
        mapType
    });

    tour.save().then(() => {
        return res.json({});
    }).catch((error) => {
        return res.status(500).json({ error });
    });
};

exports.uploadCover = (req, res) => {
    const { id } = req.params;
    if (id == null) {
        res.json({ error: "id should be provided" });
    }

    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let tour = null;
    let newFileName = null;
    const cover = req.files.cover;

    Tour.findById(id)
        .then((t) => {
            tour = t;
            const removePromise = t.cover.filename != null ? removeFile(t.cover.filename) : Promise.resolve();
            return removePromise;
        }).then(() => {
            const extension = path.extname(cover.name);
            newFileName = `${tour.id}-${uuidv1()}-cover${extension}`;

            return addFile(newFileName, cover);
        }).then(() => {
            return Tour.findOneAndUpdate({ _id: id }, {
                $set: {
                    cover: {
                        filename: newFileName,
                        contentType: cover.mimetype,
                    }
                }
            }, { new: true });
        }).then((tour) => {
            return res.json({ tour: tour.toClient() });
        }).catch((error) => {
            return res.json({ error });
        });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    Tour.findOneAndDelete(id, error => {
        if (error) {
            return res.status(500).send({ error });
        } else {
            return res.json({});
        }
    });
};
