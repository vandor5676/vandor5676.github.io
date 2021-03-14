// globals
const globals = {
    time:1,
}

//create Geometry
const sphereBufferInfo = primitives.createSphereWithVertexColorsBufferInfo(gl, 10, 12, 6);
const cubeBufferInfo   = primitives.createCubeWithVertexColorsBufferInfo(gl, 25);
const coneBufferInfo   = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 5, 0, 20, 12, 1, true, false);

//non animated propertys
//
var sphereTranslation = [  0, 30, 0];
var cubeTranslation   = [0, 0, 0];
var coneTranslation   = [ 0, 20, 0];
//


function drawTree()
{
    // ------ Draw the sphere --------
    var sphereUniforms = {
        u_colorMult: [0.5, 1, 0.5, 1],
        u_matrix: m4.identity(),
      };

    var sphereYRotation =  globals.time;
  
    // Setup all the needed attributes.
    webglUtils.setBuffersAndAttributes(gl, programInfo, sphereBufferInfo);

    sphereUniforms.u_matrix = computeMatrix(
        viewProjectionMatrix,
        sphereTranslation,
        sphereYRotation);

    // Set the uniforms we just computed
    webglUtils.setUniforms(programInfo, sphereUniforms);

    gl.drawArrays(gl.TRIANGLES, 0, sphereBufferInfo.numElements);

    // ------ Draw the cube --------
    var cubeUniforms = {
        u_colorMult: [1, 0.5, 0.5, 1],
        u_matrix: m4.identity(),
      };
    var cubeYRotation = globals.time;

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
    var coneUniforms = {
        //u_colorMult: [0.5, 0.5, 1, 1],
        u_colorMult: hexToRgbVec4("BE624D"),
        u_matrix: m4.identity(),
      };
    var coneYRotation   = globals.time;

    // Setup all the needed attributes.
    webglUtils.setBuffersAndAttributes(gl, programInfo, coneBufferInfo);

    coneUniforms.u_matrix = computeMatrix(
        viewProjectionMatrix,
        coneTranslation,
        coneYRotation);

    // Set the uniforms we just computed
    webglUtils.setUniforms(programInfo, coneUniforms);

    gl.drawArrays(gl.TRIANGLES, 0, coneBufferInfo.numElements);
}