export default class Color {

    constructor(red, green, blue, alpha) {
        this.r = red;
        this.g = green;
        this.b = blue;
        this.a = alpha;
    }

    getArray() {
        return [this.r, this.g, this.b, this.a]
    }

}