function radToDeg(r) {
    return r * 180 / Math.PI;
  }

  function degToRad(d) {
    return d * Math.PI / 180;
  }

  function degToRad(d) {
    return d * Math.PI / 180;
  }

  var cameraAngleRadians = degToRad(0);
  var fieldOfViewRadians = degToRad(60);
  var cameraHeight = 50;

  var cameraAngleRadians = degToRad(0);
  var fieldOfViewRadians = degToRad(60);

  function camera()
  {
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
  }