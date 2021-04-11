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
const carrotBufferInfo   = createFlattenedFunc(createCrrotVertices(2.5, 12, 6));

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

//texture
 // look up where the vertex data needs to go.
 var texcoordLocation = gl.getAttribLocation(programInfo.program, "a_texcoord");

 // lookup uniforms
 var textureLocation = gl.getUniformLocation(programInfo.program, "u_texture");

// Create a buffer for positions
// var positionBuffer = gl.createBuffer();
// // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
// gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// // Put the positions in the buffer
// setGeometry(gl);

// provide texture coordinates for the rectangle.
var texcoordBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
// Set Texcoords.
setTexcoords(gl);

// Create a texture.
var texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
// Fill the texture with a 1x1 blue pixel.
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
// Asynchronously load an image
var image = new Image();
image.src = "../resources/textures/catMap.png";
image.addEventListener('load', function() {
  // Now that the image has loaded make copy it to the texture.
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);

  // Check if the image is a power of 2 in both dimensions.
  if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
     // Yes, it's a power of 2. Generate mips.
     gl.generateMipmap(gl.TEXTURE_2D);
  } else {
     // No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
});

function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}

function setTexcoords(gl) {
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(
        [
        // select the top left image
        0   , 0  ,
        0   , 0.5,
        0.25, 0  ,
        0   , 0.5,
        0.25, 0.5,
        0.25, 0  ,
        // select the top middle image
        0.25, 0  ,
        0.5 , 0  ,
        0.25, 0.5,
        0.25, 0.5,
        0.5 , 0  ,
        0.5 , 0.5,
        // select to top right image
        0.5 , 0  ,
        0.5 , 0.5,
        0.75, 0  ,
        0.5 , 0.5,
        0.75, 0.5,
        0.75, 0  ,
        // select the bottom left image
        0   , 0.5,
        0.25, 0.5,
        0   , 1  ,
        0   , 1  ,
        0.25, 0.5,
        0.25, 1  ,
        // select the bottom middle image
        0.25, 0.5,
        0.25, 1  ,
        0.5 , 0.5,
        0.25, 1  ,
        0.5 , 1  ,
        0.5 , 0.5,
        // select the bottom right image
        0.5 , 0.5,
        0.75, 0.5,
        0.5 , 1  ,
        0.5 , 1  ,
        0.75, 0.5,
        0.75, 1  ,

      ]),
      gl.STATIC_DRAW);
}
