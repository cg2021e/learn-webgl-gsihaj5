import * as WEBGL from "./webgl.js"

let context, canvas, shaderProgram, vertices;

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
    vertices = new Float32Array([
        0, 0, 0,
        .5, 0, 0,
        .5, .5, 0,
        .5, 0, 0,
        1, 0, 0,
        .5, .5, 0
    ])

    WEBGL.bindArrayInsideShader(context, shaderProgram, vertices, "aCoordinates")

    //reset the canvas
    context.clearColor(1.0, 1.0, 1.0, 1.0)
    context.clear(context.COLOR_BUFFER_BIT);

    context.drawArrays(context.TRIANGLE_FAN, 0, vertices.length / 3);
}

function update() {
    vertices.forEach((vertex, index) => {
        if ((index + 1) % 3 !== 0) {
            vertices[index] += .001
        }
    })
    WEBGL.bindArrayInsideShader(context, shaderProgram, vertices, "aCoordinates")

    //reset the canvas
    context.clearColor(1.0, 1.0, 1.0, 1.0)
    context.clear(context.COLOR_BUFFER_BIT);

    context.drawArrays(context.TRIANGLE_FAN, 0, vertices.length / 3);
}

function animate() {
    requestAnimationFrame(animate);
    update();
}


window.onload = () => {
    main();
    animate();
};

