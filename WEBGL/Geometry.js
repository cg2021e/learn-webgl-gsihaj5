import Vector3 from "./Vector3.js";

export default class Geometry {
    _vertices = []; // Vector3
    _faces = [];
    _colors = [];

    //position :Vector3
    constructor(position = new Vector3(0, 0, 0)) {
        this.position = position
    }

    //Vector3
    addVertice(vertice) {
        this._vertices.push(vertice)
    }

    addFace(face) {
        this._faces.push(face)
    }

    addColor(color) {
        this._colors.push(color)
    }

    getVerticeArray() {
        let vertices = [];

        this._faces.forEach((faces) => {
            faces.getArray().forEach((index) => vertices.push(...this._vertices[index].getArray()))
        })

        return vertices
    }

    getColorArray() {

    }


}