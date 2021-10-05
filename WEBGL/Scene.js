export default class Scene {
    geometries = [];

    constructor(domElement) {
        this.domElement = domElement;
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
    }

    _createVertexShader() {

        let vertexShaderCode = `
            attribute vec3 aCoordinates;
            attribute vec3 aColors;
            uniform mat4 uProjectionMatrix;
            uniform mat4 uViewMatrix;
            varying mediump vec4 vColor;
            void main(){
                gl_Position =  uProjectionMatrix * uViewMatrix *  vec4(aCoordinates.x / 100.0, aCoordinates.y / 100.0, aCoordinates.z / 100.0, 1.0);
                vColor = vec4(aColors, 1);
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

        let coordinate = this.context.getAttribLocation(this.shaderProgram, shaderAttribute)
        this.context.vertexAttribPointer(coordinate, 3, this.context.FLOAT, false, 0, 0);
        this.context.enableVertexAttribArray(coordinate)
    }

    add(geometry) {
        this.geometries.push(geometry)
    }

    remove(removedGeometry) {
        this.geometries.forEach((geometry, index, object) => {
            if (removedGeometry === geometry) object.splice(index, 1);
        })
    }

    render() {
        let vertices = [];
        let colors = [];


        this.geometries.forEach((geometry) => {
            vertices.push(...geometry.getVerticeArray())
            colors.push(...geometry.getColorArray())
        })


        vertices = new Float32Array([...vertices])
        colors = new Float32Array([...colors])


        this.context.enable(this.context.DEPTH_TEST);
        this.context.depthFunc(this.context.LEQUAL);
        this.context.clearColor(1.0, 1.0, 1.0, 1.0)
        this.context.clearDepth(1.0)
        this.context.clear(this.context.COLOR_BUFFER_BIT);
        this.context.viewport(0, 0, this.domElement.width, this.domElement.height);

        this.context.enable(this.context.BLEND);
        this.context.blendFunc(
            this.context.ONE,
            this.context.ONE_MINUS_SRC_ALPHA
        );


        let projection_matrix = this.get_projection(30, this.domElement.width / this.domElement.height, 1, 100);
        let PMatrixPointer = this.context.getUniformLocation(this.shaderProgram, "uProjectionMatrix")
        this.context.uniformMatrix4fv(PMatrixPointer, false, projection_matrix)

        let viewMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        viewMatrix[14] = viewMatrix[14] - 3;
        let VMatrixPointer = this.context.getUniformLocation(this.shaderProgram, "uViewMatrix")
        this.context.uniformMatrix4fv(VMatrixPointer, false, viewMatrix)

        this._bindArrayInsideShader(vertices, "aCoordinates")
        this._bindArrayInsideShader(colors, "aColors")
        this.context.drawArrays(this.context.TRIANGLES, 0, vertices.length / 3);
    }

    get_projection(angle, a, zMin, zMax) {
        let ang = Math.tan((angle * .5) * Math.PI / 180);//angle*.5
        return [
            0.5 / ang, 0, 0, 0,
            0, 0.5 * a / ang, 0, 0,
            0, 0, -(zMax + zMin) / (zMax - zMin), -1,
            0, 0, (-2 * zMax * zMin) / (zMax - zMin), 0
        ];
    }


}