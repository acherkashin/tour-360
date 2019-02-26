const fs = require('fs-extra');

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

exports.addFile = addFile;
exports.removeFile = removeFile;
exports.getFilePath = getFilePath;
