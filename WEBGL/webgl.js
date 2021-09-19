export function createShaderProgram(context) {
    let shaderProgram = context.createProgram()
    context.attachShader(shaderProgram, _createVertexShader(context))
    context.attachShader(shaderProgram, _createFragmentShader(context))
    context.linkProgram(shaderProgram)
    context.useProgram(shaderProgram)

    return shaderProgram
}

function _createVertexShader(context) {

    let vertexShaderCode = `
    attribute vec3 aCoordinates;
    varying mediump vec4 vColor;
    void main(){
        gl_Position = vec4(aCoordinates, 1.0);
        gl_PointSize = 10.0;
        vColor = vec4(1 , .5 , .5 , 1);
    }`

    let vertexShader = context.createShader(context.VERTEX_SHADER);
    context.shaderSource(vertexShader, vertexShaderCode)
    context.compileShader(vertexShader)

    return vertexShader;
}

function _createFragmentShader(context) {
    let fragmentShaderCode = `
    varying mediump vec4 vColor;
    void main(){
        gl_FragColor = vColor;
    }
    `

    let fragmentShader = context.createShader(context.FRAGMENT_SHADER)
    context.shaderSource(fragmentShader, fragmentShaderCode)
    context.compileShader(fragmentShader)

    return fragmentShader
}

export function bindArrayInsideShader(context, shaderProgram, arrayToBePushed, shaderAttribute) {
    _bindAndPushDataToBuffer(context, arrayToBePushed)
    _bindBufferToShaderAttribute(context, shaderProgram, shaderAttribute)
}

function _bindAndPushDataToBuffer(context, arrayToBePushed) {
    let vertex_buffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, vertex_buffer)
    context.bufferData(context.ARRAY_BUFFER, arrayToBePushed, context.STATIC_DRAW)
}

function _bindBufferToShaderAttribute(context, shaderProgram, shaderAttribute) {
    let coordinate = context.getAttribLocation(shaderProgram, shaderAttribute)
    context.vertexAttribPointer(coordinate, 3, context.FLOAT, false, 0, 0);
    context.enableVertexAttribArray(coordinate)
}
