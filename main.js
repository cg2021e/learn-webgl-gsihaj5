import * as WEBGL from "./WEBGL/webgl.js"
import Vertice from "./WEBGL/Vertice.js";

let context, canvas, shaderProgram, bufferVertices;

let vertices

function main() {
    //region BASIC SETUP
    canvas = document.querySelector("#glCanvas");
    context = canvas.getContext("webgl");

    if (context === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    shaderProgram = WEBGL.createShaderProgram(context)
    //endregion

    //put vertices inside buffer

    vertices = [
        new Vertice(0, 0, 0),
        new Vertice(.5, 0, 0),
        new Vertice(.5, .5, 0)
    ]

    bufferVertices = Vertice.convertAllVerticeToSingleFloat32Array()

    WEBGL.bindArrayInsideShader(context, shaderProgram, bufferVertices, "aCoordinates")

    //reset the canvas
    context.clearColor(1.0, 1.0, 1.0, 1.0)
    context.clear(context.COLOR_BUFFER_BIT);

    context.drawArrays(context.TRIANGLE_FAN, 0, vertices.length / 3);
}

function update() {
    vertices.forEach(vertice => {
            vertice.x += .01;
            if (vertice.x > 1) vertice.x = 0;
        }
    )

    bufferVertices = Vertice.convertAllVerticeToSingleFloat32Array()
    WEBGL.bindArrayInsideShader(context, shaderProgram, bufferVertices, "aCoordinates")

    //reset the canvas
    context.clearColor(1.0, 1.0, 1.0, 1.0)
    context.clear(context.COLOR_BUFFER_BIT);

    context.drawArrays(context.TRIANGLE_FAN, 0, bufferVertices.length / 3);
}

function animate() {
    requestAnimationFrame(animate);
    update();
}


window.onload = () => {
    main();
    animate();
};

