const fs = require('fs-extra');
const path = require('path');
const uuidv1 = require('uuidv1');

function addFile(filename, file) {
    const filepath = getFilePath(filename);

    return fs.writeFile(filepath, new Buffer(file.data, "binary"));
}

function removeFile(filename) {
    const filepath = getFilePath(filename);

    return fs.unlink(filepath);
}

function getFilePath(filename) {
    return `${__dirname}\\..\\public\\${filename}`;
}

function generatePlaceImage360Name(place, mapImage) {
    const extension = path.extname(mapImage.name);
    const newFileName = `${place.id}-${uuidv1()}-place-360${extension}`;

    return newFileName;
}

function generateTourImageName(tour, mapImage) {
    const extension = path.extname(mapImage.name);
    const newFileName = `${tour.id}-${uuidv1()}-map${extension}`;

    return newFileName;
}

function generatePlaceSoundName(place, sound) {
    const extension = path.extname(sound.name);
    const newFileName = `${place.id}-${uuidv1()}-sound${extension}`;

    return newFileName;
}

exports.addFile = addFile;
exports.removeFile = removeFile;
exports.getFilePath = getFilePath;
exports.generatePlaceImage360Name = generatePlaceImage360Name;
exports.generateTourImageName = generateTourImageName;
exports.generatePlaceSoundName = generatePlaceSoundName;