// Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.querySelector("#canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    //return;
    alert("Cant get gl")
  }



  // setup GLSL program
  programInfo = webglUtils.createProgramInfo(gl, ["vertex-shader-3d", "fragment-shader-3d"]);