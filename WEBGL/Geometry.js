import Vector3 from "./Vector3.js";
import Color from "./Color.js";

export default class Geometry {
    _vertices = []; // Vector3
    _faces = [];

    //position :Vector3
    constructor(position = new Vector3(0, 0, 0), color = new Color(255, 0, 0)) {
        this.position = position
        this.color = color;
    }

    //Vector3
    addVertice(vertice) {
        this._vertices.push(vertice)
    }

    addFace(face) {
        this._faces.push(face)
    }

    getColorArray() {
        let colors = [];

        this._faces.forEach((faces) => {
            faces.getArray().forEach((index) => colors.push(...this.color.getArray()))
        })
        return colors
    }

    getVertices() {
        let vertices = [];

        this._faces.forEach((faces) => {
            faces.getArray().forEach((index) => vertices.push(this._vertices[index]))
        })

        return vertices
    }

    getVerticeArray() {
        let vertices = [];

        this._faces.forEach((faces) => {
            faces.getArray().forEach((index) => vertices.push(...this._vertices[index].getArray()))
        })

        return vertices
    }

    translate(x, y, z) {
        this.position.x += x;
        this.position.y += y;
        this.position.z += z;
    }

}