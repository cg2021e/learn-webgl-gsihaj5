import Geometry from "./Geometry.js";
import Vector3 from "./Vector3.js";
import Face from "./Face.js";

export default class Cylinder extends Geometry {

    constructor(bottomRadius, topRadius, height, section, position, color) {
        super(position, color);


        this.section = section;

        this._createCircleVertice(bottomRadius, this.position.y)
        this._createCircleFace(0, 1, this.section)

        this._createCircleVertice(topRadius, this.position.y + height)
        this._createCircleFace(this.section + 1, this.section + 2, this.section * 2 + 1)

        this._createVerticalFace()
    }

    _createCircleVertice(radius, y) {
        let deltaAngle = 360 / this.section;
        let angle = 0;

        //set center point
        this.addVertice(this.position.clone());

        while (angle < 360) {
            let x = radius * Math.cos(angle * (Math.PI / 180))
            let z = radius * Math.sin(angle * (Math.PI / 180))
            this.addVertice(new Vector3(this.position.x + x, y, this.position.z + z))
            angle += deltaAngle
        }
    }

    _createCircleFace(center, startIndex, endIndex) {
        for (let i = startIndex; i <= endIndex; i++) {
            let face = new Face(center, i, (i + 1) <= endIndex ? i + 1 : center + 1)
            this.addFace(face)
        }
    }

    _createVerticalFace() {
        for (let i = 1; i <= this.section; i++) {
            if (i < this.section) {
                this.addFace(new Face(i, i + 1, this.section + 1 + i));
                this.addFace(new Face(i + 1, this.section + 2 + i, this.section + 1 + i))
            } else {
                this.addFace(new Face(this.section, 1, this.section * 2 + 1));
                this.addFace(new Face(1, this.section * 2 + 1, this.section + 2))
            }
        }
    }


}
