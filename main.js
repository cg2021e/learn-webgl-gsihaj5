import Scene from "./WEBGL/Scene.js";
import Geometry from "./WEBGL/Geometry.js";
import Vector3 from "./WEBGL/Vector3.js";
import Face from "./WEBGL/Face.js";

let canvas, scene;

function main() {
    canvas = document.querySelector("#glCanvas");
    scene = new Scene(canvas);

    let geometry = new Geometry();

    geometry.addVertice(new Vector3(0, 0, 0))
    geometry.addVertice(new Vector3(0, .5, 0))
    geometry.addVertice(new Vector3(.5, .5, 0))

    geometry.addFace(new Face(0, 1, 2))

    scene.add(geometry)

    let geometry1 = new Geometry();

    geometry1.addVertice(new Vector3(.5, 0, 0))
    geometry1.addVertice(new Vector3(1, 0, 0))
    geometry1.addVertice(new Vector3(1, .5, 0))

    geometry1.addFace(new Face(0, 1, 2))

    scene.add(geometry1)
}

function update() {
    scene.render();
}

function animate() {
    requestAnimationFrame(animate);
    update();
}


window.onload = () => {
    main();
    animate();
};

