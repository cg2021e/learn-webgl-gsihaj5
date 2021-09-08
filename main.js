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

    WEBGL.setupShaderProgram(context)
    //endregion

    context.clearColor(1.0, 1.0, 1.0, 1.0)
    context.clear(context.COLOR_BUFFER_BIT);

    context.drawArrays(context.POINTS, 0, 1);
}

window.onload = main;

