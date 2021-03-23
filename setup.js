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


const objectsToDraw = [];
const objects = [];

// Make infos for each object for each object.
const baseHue = rand(0, 360);
const numObjects = 4;
for (let ii = 0; ii < numObjects; ++ii) {
  const id = ii + 1;
  const object = {
    uniforms: {
      u_colorMult: chroma.hsv(eMod(baseHue + rand(0, 120), 360), rand(0.5, 1), rand(0.5, 1)).gl(),
      u_matrix: m4.identity(),
      u_id: [
        ((id >> 0) & 0xFF) / 0xFF,
        ((id >> 8) & 0xFF) / 0xFF,
        ((id >> 16) & 0xFF) / 0xFF,
        ((id >> 24) & 0xFF) / 0xFF,
      ],
    },
    translation: [rand(-100, 100), rand(-100, 100), rand(-150, -50)],
    xRotationSpeed: rand(0.8, 1.2),
    yRotationSpeed: rand(0.8, 1.2),
  };
  objects.push(object);
  objectsToDraw.push({
    programInfo: programInfo,
    bufferInfo: shapes[ii % shapes.length],
    uniforms: object.uniforms,
  });
}