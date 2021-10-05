export default class Color {

    constructor(red = 255, green = 255, blue = 255) {
        this.r = red / 255;
        this.g = green / 255;
        this.b = blue / 255;
    }

    getArray() {
        return [this.r, this.g, this.b]
    }

}