[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=5550268&assignment_repo_type=AssignmentRepo)

# Learn WebGL

### In this repository I created some kind of bundle inside the folder "WEBGL"

I'm pretty confident if you just copy and paste the "WEBGL" folder, you will be able to render some simple things.
currently there is no rotational functionality

## How To Use The Bundle

### Initial Setup

if you already copy paste the "WEBGL" folder, you can write very simple html5 document and add canvas tag.

After creating the canvas tag, you simply load your js file like this

```html

<script type="module" src="main.js"></script>
```

Inside the main.js you have to initiate Scene class from the bundle

```js
canvas = document.querySelector("#glCanvas");
scene = new Scene(canvas);
```

After that create an update function and animate it.

```js
function animate() {
    requestAnimationFrame(animate);
    update();
}

function update() {
    scene.render();
}
```

### Creating Geometry

To create Geometry simply, instantiate Geometry class.

```js
let geometry = new Geometry()
```

then add the vertice and the face base on the vertices index

```js
let geometry = new Geometry();

geometry.addVertice(new Vector3(0, 0, 0))
geometry.addVertice(new Vector3(0, .5, 0))
geometry.addVertice(new Vector3(.5, .5, 0))

geometry.addFace(new Face(0, 1, 2))
```

after defining geometry don't forget to add the geometry to scene.

```js 
scene.add(geometry)
```