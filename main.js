import Scene from "./WEBGL/Scene.js";
import Vector3 from "./WEBGL/Vector3.js";
import EssentialOilBottle from "./EssentialOilBottle.js";
import Color from "./WEBGL/Color.js";
import Geometry from "./WEBGL/Geometry.js";
import Face from "./WEBGL/Face.js";

let canvas, scene;
let bottle, bottle1

let speed = .5

function main() {
    canvas = document.querySelector("#glCanvas");
    scene = new Scene(canvas);

    bottle = new EssentialOilBottle(new Vector3(50, -50, 0), true);
    scene.add(bottle)

    bottle1 = new EssentialOilBottle(new Vector3(-50, -30, 0), true);

    scene.add(bottle1)
    let label = new Geometry(bottle1.position.clone(), new Color(60, 60, 60))

    let offsetX = -45;
    let offsetY = -20;
    let offsetZ = 100;
    let width = 15
    let height = 25

    label.addVertice(new Vector3(offsetX + 3, offsetY + 1, offsetZ)) //krii bawh
    label.addVertice(new Vector3(offsetX + width + 3, offsetY, offsetZ)) // kanan bawah
    label.addVertice(new Vector3(offsetX, offsetY + height, offsetZ))// kiri atas
    label.addVertice(new Vector3(offsetX + width, offsetY + height, offsetZ)) //kanan atas


    label.addFace(new Face(0, 1, 2))
    label.addFace(new Face(1, 2, 3))


    scene.add(label)


    // scene.render()
}

function update() {
    if (bottle.position.y <= -75 || bottle.position.y > 0)
        speed *= -1

    bottle.translate(0, speed, 0)

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

