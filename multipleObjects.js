"use strict";
var gl;
var programInfo;
var viewProjectionMatrix;


function main() {
  

  function degToRad(d) {
    return d * Math.PI / 180;
  }

  var cameraAngleRadians = degToRad(0);
  var fieldOfViewRadians = degToRad(60);
  var cameraHeight = 50;

  // Uniforms for each object.
  
  var cubeUniforms = {
    u_colorMult: [1, 0.5, 0.5, 1],
    u_matrix: m4.identity(),
  };
  var coneUniforms = {
    //u_colorMult: [0.5, 0.5, 1, 1],
    u_colorMult: hexToRgbVec4("BE624D"),
    u_matrix: m4.identity(),
  };
  
  var cubeTranslation   = [0, 0, 0];
  var coneTranslation   = [ 0, 20, 0];

  

  requestAnimationFrame(drawScene);

  //
  //
  function radToDeg(r) {
    return r * 180 / Math.PI;
  }

  function degToRad(d) {
    return d * Math.PI / 180;
  }

  var cameraAngleRadians = degToRad(0);
  var fieldOfViewRadians = degToRad(60);

  // Setup a ui.
  webglLessonsUI.setupSlider("#cameraAngle", {value: radToDeg(cameraAngleRadians), slide: updateCameraAngle, min: 0, max: 360});
  function updateCameraAngle(event, ui) {
    cameraAngleRadians = degToRad(ui.value);
    drawScene();
  }

  // Draw the scene.
  function drawScene(time) {
    time *= 0.0001;
    globals.time = time;
    
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Compute the projection matrix
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix =
        m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.
    var cameraPosition = [0, 50, 60];
    var target = [0, 0, 0];
    var up = [0,1, 0];
    var cameraMatrix = m4.lookAt(cameraPosition, target, up);
    cameraMatrix = m4.multiply(m4.yRotation(cameraAngleRadians),cameraMatrix,);
    cameraMatrix = m4.translate(cameraMatrix, 0, 0, 1 * 1);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);


    var cubeYRotation   =  time;
    var coneYRotation   = time;


    gl.useProgram(programInfo.program);
    drawTree();

    // ------ Draw the cube --------

    // Setup all the needed attributes.
    webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBufferInfo);

    cubeUniforms.u_matrix = computeMatrix(
        viewProjectionMatrix,
        cubeTranslation,
        cubeYRotation);

    // Set the uniforms we just computed
    webglUtils.setUniforms(programInfo, cubeUniforms);

    gl.drawArrays(gl.TRIANGLES, 0, cubeBufferInfo.numElements);

    // ------ Draw the cone --------

    // Setup all the needed attributes.
    webglUtils.setBuffersAndAttributes(gl, programInfo, coneBufferInfo);

    coneUniforms.u_matrix = computeMatrix(
        viewProjectionMatrix,
        coneTranslation,
        coneYRotation);

    // Set the uniforms we just computed
    webglUtils.setUniforms(programInfo, coneUniforms);

    gl.drawArrays(gl.TRIANGLES, 0, coneBufferInfo.numElements);

    requestAnimationFrame(drawScene);
  }
}

main();
