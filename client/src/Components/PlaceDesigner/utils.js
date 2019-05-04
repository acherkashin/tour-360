export const HEIGHT = 600;
export const WIDTH = 1170 * 4;

export function getScreenCoordinates(x, y) {
    return {
        left: getScreenX(x),
        top: getScreenY(y),
    };
}

export function getScreenX(x) {
    return x + WIDTH / 2;
}

export function getScreenY(y) {
    return - y + HEIGHT / 2;
}
