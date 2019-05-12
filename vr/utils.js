import { NativeModules } from 'react-360';

export function getUrlParams() {
    let rawParams = NativeModules.Location.search;
    // remove ? from the begining
    rawParams = rawParams.substring(1, rawParams.length);
    const separators = ['=', '&'].join('|');
    const tokens = rawParams.split(new RegExp(separators, 'g'));

    const params = {};
    const fields = ['sessionId', 'placeId', 'tourId', 'token', 'coordinates'];
    fields.forEach((field) => {
        const fieldIndex = tokens.indexOf(field);
        if (fieldIndex !== -1) {
            params[field] = tokens[fieldIndex + 1];
        }
    });

    return params;
}
