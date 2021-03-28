var sphereUniforms;
var cubeUniforms;
var coneUniforms;
var appleUniforms;

// globals
const globals = {
    time: 1,
    frameCount:0,
    objectUniforms: [
        sphereUniforms = {
            u_colorMult: [0.5, 1, 0.5, 1],
            u_matrix: m4.identity(),
            u_id: [
                ((1 >> 0) & 0xFF) / 0xFF,
                0,
                0,
                0,
            ],
            isHovered: false,
        },
        cubeUniforms = {
            u_colorMult: [1, 0.5, 0.5, 1],
            u_matrix: m4.identity(),
            u_id: [
                ((2 >> 0) & 0xFF) / 0xFF,
                0,
                0,
                0,
            ],
        },
        coneUniforms = {
            u_colorMult: hexToRgbVec4("BE624D"),
            u_matrix: m4.identity(),
            u_id: [
                ((3 >> 0) & 0xFF) / 0xFF,
                0,
                0,
                0,
            ],
        },
        appleUniforms = {
            u_colorMult: hexToRgbVec4("DC143C"),
            u_matrix: m4.identity(),
            u_id: [
                ((4 >> 0) & 0xFF) / 0xFF,
                0,
                0,
                0,
            ],
        },
    ],
};




//position constants
var groundHeight = 14;

//non animated propertys
//
var sphereTranslation = [0, 30, 0];
var cubeTranslation = [0, 0, 0];
var coneTranslation = [0, 20, 0];
var appleTranslation = [7, 22, 0];
var appleLocationList = [
    [7, 22, 0],
    [4.12, -1 + 30, -8.66],
    [-7, -4 + 30, -4],
    [-8, 4 + 30, 3],

]

var appleScale = [0.3,0.3,0.3];
//

// colorshift
var colorShift = 0.1;

//gravity
var gravity = 0.1;

function drawTree(overRideProgramInfo) {
    var programInfo = overRideProgramInfo;
    //global rotation
    var globalRotation = 0;


    // ------ Draw the sphere --------



    gl.useProgram(programInfo.program);
    // Setup all the needed attributes.
    webglUtils.setBuffersAndAttributes(gl, programInfo, sphereBufferInfo);

    //get translation animation
    sphereTranslation[0] = animateTreeShake(sphereTranslation[0], frameCount);

    sphereUniforms.u_matrix = computeMatrix(
        viewProjectionMatrix,
        sphereTranslation,
        globalRotation);

    // Set the uniforms we just computed
    webglUtils.setUniforms(programInfo, sphereUniforms);

    gl.drawArrays(gl.TRIANGLES, 0, sphereBufferInfo.numElements);

    // ------ Draw the cube --------

    // Setup all the needed attributes.
    webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBufferInfo);

    cubeUniforms.u_matrix = computeMatrix(
        viewProjectionMatrix,
        cubeTranslation,
        globalRotation);

    // Set the uniforms we just computed
    webglUtils.setUniforms(programInfo, cubeUniforms);

    gl.drawArrays(gl.TRIANGLES, 0, cubeBufferInfo.numElements);

    // ------ Draw the cone --------

    // Setup all the needed attributes.
    webglUtils.setBuffersAndAttributes(gl, programInfo, coneBufferInfo);

    coneUniforms.u_matrix = computeMatrix(
        viewProjectionMatrix,
        coneTranslation,
        globalRotation);

    // Set the uniforms we just computed
    webglUtils.setUniforms(programInfo, coneUniforms);

    gl.drawArrays(gl.TRIANGLES, 0, coneBufferInfo.numElements);


    //---draw apples ---
    //
    for (var i = 0; i < 4; i++) {
        // Setup all the needed attributes.
        webglUtils.setBuffersAndAttributes(gl, programInfo, sphereBufferInfoApple);

        //animate gravity and location
        appleTranslation = appleLocationList[i];
        appleTranslation[1] = animateGravity(appleTranslation[1]);
        
        //animate apple grow
        appleScale= appleScale.map(function(x){return slowGroth(1,x,0.0005)})

        appleUniforms.u_matrix = computeMatrix(
            viewProjectionMatrix,
            appleTranslation,
            globalRotation,
            appleScale);

        // Set the uniforms we just computed
        webglUtils.setUniforms(programInfo, appleUniforms);

        gl.drawArrays(gl.TRIANGLES, 0, sphereBufferInfoApple.numElements);

    }
}


