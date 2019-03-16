export const HEIGHT = 600;
export const WIDTH = 1170 * 4; // 90 deg * 4

export function degreeToPosition(degrees) {
    const position = (WIDTH * degrees) / 360;
    return position;
}