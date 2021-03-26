"use strict";
var gl;
var fb;
//var programInfo;
var viewProjectionMatrix;


function main() {

  //setup things for picking
  pickSetup();

  requestAnimationFrame(drawScene);

  // Setup a ui.
  webglLessonsUI.setupSlider("#cameraAngle", { value: radToDeg(cameraAngleRadians), slide: updateCameraAngle, min: 0, max: 360 });
  function updateCameraAngle(event, ui) {
    cameraAngleRadians = degToRad(ui.value);
    //drawScene();
  }



  // Draw the scene.
  function drawScene(time) {
    time *= 0.0001;
    globals.time = time;
    ++frameCount;

    if (webglUtils.resizeCanvasToDisplaySize(gl.canvas)) {
      // the canvas was resized, make the framebuffer attachments match
      setFramebufferAttachmentSizes(gl.canvas.width, gl.canvas.height);
    }

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    //set up camera 
    camera();

    gl.useProgram(programInfo.program);

    //pick and animation
    pickAnimation();


    // ------ Draw the objects to the canvas

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    //drawObjects(objectsToDraw);
    drawTree(programInfo);


    requestAnimationFrame(drawScene);
  }


}

main();
