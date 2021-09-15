export default class Vertice {
    static vertices = [];

    static convertAllVerticeToSingleFloat32Array(float32Array) {
        let allPoint = []
        Vertice.vertices.forEach(vertice => {
                allPoint.push(...vertice.getArray())
            }
        );

        return new Float32Array(allPoint);
    }

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        Vertice.vertices.push(this);
    }

    getArray() {
        return [this.x, this.y, this.z]
    }
}