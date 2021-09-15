import * as WEBGL from "./webgl.js"

function main() {
    //region BASIC SETUP
    const canvas = document.querySelector("#glCanvas");
    const context = canvas.getContext("webgl");

    // Only continue if WebGL is available and working
    if (context === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    let shaderProgram = WEBGL.createShaderProgram(context)
    //endregion

    //put vertices inside buffer
    let vertices = new Float32Array([
        0, 0, 0,
        .5, 0, 0,
        .5, .5, 0,
        .5, 0, 0,
        1, 0, 0,
        .5, .5, 0
    ])
    let vertex_buffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, vertex_buffer)
    context.bufferData(context.ARRAY_BUFFER, vertices, context.STATIC_DRAW)

    //get reference to coordinates variable inside vertex shader program.
    let coordinate = context.getAttribLocation(shaderProgram, "coordinates")
    context.vertexAttribPointer(coordinate, 3, context.FLOAT, false, 0, 0);
    context.enableVertexAttribArray(coordinate)

    //reset the canvas
    context.clearColor(1.0, 1.0, 1.0, 1.0)
    context.clear(context.COLOR_BUFFER_BIT);

    context.drawArrays(context.TRIANGLE_FAN, 0, vertices.length / 3);
}

window.onload = main;

