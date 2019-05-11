import fs from 'fs-extra';
import path from 'path';
import uuidv1 from 'uuidv1';

function addFile(filename: string, file) {
    const filepath = getFilePath(filename);

    return fs.writeFile(filepath, new Buffer(file.data, "binary"));
}

function removeFile(filename: string) {
    const filepath = getFilePath(filename);
    return fs.pathExists(filename).then((isExists) => {
        if (isExists) {
            return fs.unlink(filepath);
        }
    })
}

function getFilePath(filename: string) {
    return `${__dirname}\\..\\..\\public\\${filename}`;
}

function generatePlaceImage360Name(place, mapImage): string {
    const extension = path.extname(mapImage.name);
    const newFileName = `${place.id}-${uuidv1()}-place-360${extension}`;

    return newFileName;
}

function generateTourImageName(tour, mapImage): string {
    const extension = path.extname(mapImage.name);
    const newFileName = `${tour.id}-${uuidv1()}-map${extension}`;

    return newFileName;
}

function generatePlaceSoundName(place, sound): string {
    const extension = path.extname(sound.name);
    const newFileName = `${place.id}-${uuidv1()}-sound${extension}`;

    return newFileName;
}

export {
    addFile,
    removeFile,
    getFilePath,
    generatePlaceImage360Name,
    generateTourImageName,
    generatePlaceSoundName,
}
