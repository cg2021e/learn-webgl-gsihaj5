export default class Vector3 {
    static vertices = [];

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        Vector3.vertices.push(this);
    }

    getArray() {
        return [this.x, this.y, this.z]
    }
}