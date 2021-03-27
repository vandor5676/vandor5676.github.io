// Get A WebGL context
/** @type {HTMLCanvasElement} */
var canvas = document.querySelector("#canvas");
var gl = canvas.getContext("webgl");
if (!gl) {
  //return;
  alert("Cant get gl")
}

//shape constants
//create Geometry
var sphereBufferInfo = primitives.createSphereWithVertexColorsBufferInfo(gl, 10, 12, 6);
const sphereBufferInfoApple = primitives.createSphereWithVertexColorsBufferInfo(gl,2.5, 12, 6);
const cubeBufferInfo   = primitives.createCubeWithVertexColorsBufferInfo(gl, 25);
const coneBufferInfo   = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 5, 0, 20, 12, 1, true, false);

const shapes = [
    sphereBufferInfo,
    sphereBufferInfoApple,
    cubeBufferInfo,
    coneBufferInfo,
  ];


// setup GLSL programs
const programInfo = webglUtils.createProgramInfo(
  gl, ["vertex-shader-3d", "fragment-shader-3d"]);
const pickingProgramInfo = webglUtils.createProgramInfo(
  gl, ["pick-vertex-shader", "pick-fragment-shader"]);



