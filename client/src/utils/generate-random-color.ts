import uniqolor from "uniqolor";

export function generateRandomColor() {
    const { color } = uniqolor.random({
        format: "rgb",
        saturation: 80,
        lightness: [60, 80],
    });

    return color;
}
