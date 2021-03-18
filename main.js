"use strict";
var gl;
var programInfo;
var viewProjectionMatrix;


function main() {

  requestAnimationFrame(drawScene);


  // Setup a ui.
  webglLessonsUI.setupSlider("#cameraAngle", {value: radToDeg(cameraAngleRadians), slide: updateCameraAngle, min: 0, max: 360});
  function updateCameraAngle(event, ui) {
    cameraAngleRadians = degToRad(ui.value );
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

    //set up camera 
    camera();

    gl.useProgram(programInfo.program);
    drawTree();

  
    requestAnimationFrame(drawScene);
  }
}

main();
