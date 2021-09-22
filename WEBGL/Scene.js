export default class Scene {
    geometries = [];

    constructor(domElement) {
        this.context = domElement.getContext("webgl");

        if (this.context === null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
        this._createShaderProgram()
    }

    _createShaderProgram() {
        this.shaderProgram = this.context.createProgram()
        this.context.attachShader(this.shaderProgram, this._createVertexShader())
        this.context.attachShader(this.shaderProgram, this._createFragmentShader())
        this.context.linkProgram(this.shaderProgram)
        this.context.useProgram(this.shaderProgram)
        console.log("shader program created")
    }

    _createVertexShader() {

        let vertexShaderCode = `
            attribute vec3 aCoordinates;
            varying mediump vec4 vColor;
            void main(){
                gl_Position = vec4(aCoordinates, 1.0);
                gl_PointSize = 10.0;
                vColor = vec4(1 , .5 , .5 , 1);
            }`

        let vertexShader = this.context.createShader(this.context.VERTEX_SHADER);
        this.context.shaderSource(vertexShader, vertexShaderCode)
        this.context.compileShader(vertexShader)

        return vertexShader;
    }

    _createFragmentShader() {
        let fragmentShaderCode = `
            varying mediump vec4 vColor;
            void main(){
                gl_FragColor = vColor;
            }`

        let fragmentShader = this.context.createShader(this.context.FRAGMENT_SHADER)
        this.context.shaderSource(fragmentShader, fragmentShaderCode)
        this.context.compileShader(fragmentShader)

        return fragmentShader
    }

    _bindArrayInsideShader(arrayToBePushed, shaderAttribute) {
        let buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer)
        this.context.bufferData(this.context.ARRAY_BUFFER, arrayToBePushed, this.context.STATIC_DRAW)

        console.log("using shader Program")
        let coordinate = this.context.getAttribLocation(this.shaderProgram, shaderAttribute)
        this.context.vertexAttribPointer(coordinate, 3, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(coordinate)

    }

    add(geometry) {
        this.geometries.push(geometry)
    }

    render() {
        let vertices = [];

        this.geometries.forEach((geometry) => {
            vertices.push(...geometry.getVerticeArray())
        })

        console.log(vertices)
        vertices = new Float32Array([...vertices])

        this._bindArrayInsideShader(vertices, "aCoordinates")

        this.context.clearColor(1.0, 1.0, 1.0, 1.0)
        this.context.clear(this.context.COLOR_BUFFER_BIT);

        this.context.drawArrays(this.context.TRIANGLES, 0, vertices.length / 3);
    }

}