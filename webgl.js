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
    attribute vec3 coordinates;
    void main(){
        gl_Position = vec4(coordinates, 1.0);
        gl_PointSize = 10.0;
    }`

    let vertexShader = context.createShader(context.VERTEX_SHADER);
    context.shaderSource(vertexShader, vertexShaderCode)
    context.compileShader(vertexShader)

    return vertexShader;
}

function _createFragmentShader(context) {
    let fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
    `

    let fragmentShader = context.createShader(context.FRAGMENT_SHADER)
    context.shaderSource(fragmentShader, fragmentShaderCode)
    context.compileShader(fragmentShader)

    return fragmentShader
}

