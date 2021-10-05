import Cylinder from "./WEBGL/Cylinder.js";
import Geometry from "./WEBGL/Geometry.js";
import Color from "./WEBGL/Color.js";

export default class EssentialOilBottle extends Geometry {
    _geometries = [];

    constructor(position, needRotation = false) {
        super(position);
        this.needRotation = needRotation
        this._initGeometry()
    }

    addGeometry(geometry) {
        this._geometries.push(geometry)

    }

    translate(x, y, z) {
        super.translate(x, y, z);
        this._initGeometry()
    }

    _initGeometry() {
        this._geometries = [];
        let newPos;
        let height = 2

        let brownColor = new Color(152, 59, 25)
        let black = new Color(60, 60, 60)

        let bottomCurve = new Cylinder(27 / 2, 15, height, 8, this.position.clone(), brownColor)
        this._geometries.push(bottomCurve)
        newPos = this.position.clone();
        newPos.y += height

        height = 50
        let bodyCylinder = new Cylinder(15, 15, height, 8, newPos.clone(), brownColor)
        this._geometries.push(bodyCylinder)
        newPos.y += height

        height = 2
        let topCurve = new Cylinder(15, 14, height, 8, newPos.clone(), brownColor)
        this._geometries.push(topCurve)
        newPos.y += height

        height = 2
        let topCurve1 = new Cylinder(14, 12, height, 8, newPos.clone(), brownColor)
        this._geometries.push(topCurve1)
        newPos.y += height

        height = 2
        let topCurve2 = new Cylinder(12, 10, height, 8, newPos.clone(), brownColor)
        this._geometries.push(topCurve2)
        newPos.y += height

        height = 2
        let bottomPlasticLid = new Cylinder(10, 12.5, height, 8, newPos.clone(), black)
        this._geometries.push(bottomPlasticLid)
        newPos.y += height

        height = 1
        let bottomPlasticLid1 = new Cylinder(12.5, 12.5, height, 8, newPos.clone(), black)
        this._geometries.push(bottomPlasticLid1)
        newPos.y += height

        height = 6
        let bottomPlasticLid2 = new Cylinder(13, 13, height, 8, newPos.clone(), black)
        this._geometries.push(bottomPlasticLid2)
        newPos.y += height

        height = 12
        let bottomPlasticLid3 = new Cylinder(10, 10, height, 8, newPos.clone(), black)
        this._geometries.push(bottomPlasticLid3)
        newPos.y += height

        height = 3
        let topPlasticLid = new Cylinder(7.5, 5, height, 8, newPos.clone(), black)
        this._geometries.push(topPlasticLid)
        newPos.y += height

        height = 13
        let topPlasticLid1 = new Cylinder(5, 5, height, 8, newPos.clone(), black)
        this._geometries.push(topPlasticLid1)
        newPos.y += height

        height = 1
        let topPlasticLid2 = new Cylinder(5, 4, height, 8, newPos.clone(), black)
        this._geometries.push(topPlasticLid2)
        newPos.y += height

        height = 1
        let topPlasticLid3 = new Cylinder(4, 3, height, 8, newPos.clone(), black)
        this._geometries.push(topPlasticLid3)
        newPos.y += height

        height = 1
        let topPlasticLid4 = new Cylinder(3, 1, height, 8, newPos.clone(), black)
        this._geometries.push(topPlasticLid4)
        newPos.y += height
    }

    getColorArray() {
        let colors = []
        this._geometries.forEach((geometry) => colors.push(...geometry.getColorArray()))
        return colors
    }


    getVerticeArray() {
        let vec3Vertice = [];
        let vertices = []
        this._geometries.forEach((geometry) => {
            vec3Vertice.push(...geometry.getVertices())
        })

        vec3Vertice.forEach((vertice) => {
            if (this.needRotation) {
                let rotationAngle = 30 * Math.PI / 180
                let newY = vertice.y - this.position.y
                let newZ = vertice.z - this.position.z

                let cos = Math.cos(rotationAngle)
                let sin = Math.sin(rotationAngle)

                let rotateY = newY * cos - newZ * sin
                let rotateZ = newY * sin + newZ * cos

                vertices.push(
                    vertice.x,
                    rotateY + this.position.y,
                    rotateZ + this.position.z
                )
            } else {
                vertices.push(...vertice.getArray())
            }

        })

        return vertices
    }
}