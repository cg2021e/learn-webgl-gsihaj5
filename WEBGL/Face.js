export default class Face {
    /*
        @constructor
        @param number vertice1 - index of first vertice
        @param number vertice2 - index of second vertice
        @param number vertice3 - index of third vertice
     */
    constructor(vertice1, vertice2, vertice3) {
        this.vertice1 = vertice1;
        this.vertice2 = vertice2;
        this.vertice3 = vertice3;
    }

    getArray() {
        return [this.vertice1, this.vertice2, this.vertice3]
    }
}