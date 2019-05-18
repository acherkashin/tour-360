export const HEIGHT = 600;
export const WIDTH = 1170 * 4;

export function getScreenCoordinates(x: number, y: number) {
    return {
        left: getScreenX(x),
        top: getScreenY(y),
    };
}

export function getScreenX(x: number) {
    return x + WIDTH / 2;
}

export function getScreenY(y: number) {
    return - y + HEIGHT / 2;
}
