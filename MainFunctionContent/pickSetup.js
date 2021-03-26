//setup for pick
let targetTexture;
let depthBuffer;
 // mouseX and mouseY are in CSS display space relative to canvas
 let mouseX = -1;
 let mouseY = -1;
 let oldPickNdx = -1;
 let oldPickColor;
 let frameCount = 0;

function pickSetup()
{
 // Create a texture to render to
  targetTexture = gl.createTexture();
 gl.bindTexture(gl.TEXTURE_2D, targetTexture);
 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
 
 // create a depth renderbuffer
  depthBuffer = gl.createRenderbuffer();
 gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
 
 
 
 // Create and bind the framebuffer
  fb = gl.createFramebuffer();
 gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
 
 // attach the texture as the first color attachment
 const attachmentPoint = gl.COLOR_ATTACHMENT0;
 const level = 0;
 gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture, level);
 
 // make a depth buffer and the same size as the targetTexture
 gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
    
 
}

function setFramebufferAttachmentSizes(width, height) {
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);
    // define size and format of level 0
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    const data = null;
gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
  width, height, border,
  format, type, data);
  
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
}

function pickAnimation()
{
    // ------ Draw the objects to the texture --------

    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //drawObjects(objectsToDraw, pickingProgramInfo);
    drawTree(pickingProgramInfo);

    // ------ Figure out what pixel is under the mouse and read it

    const pixelX = mouseX * gl.canvas.width / gl.canvas.clientWidth;
    const pixelY = gl.canvas.height - mouseY * gl.canvas.height / gl.canvas.clientHeight - 1;
    const data = new Uint8Array(4);
    gl.readPixels(
      pixelX,            // x
      pixelY,            // y
      1,                 // width
      1,                 // height
      gl.RGBA,           // format
      gl.UNSIGNED_BYTE,  // type
      data);             // typed array to hold result
    const id = data[0];// + (data[1] << 8) + (data[2] << 16) + (data[3] << 24);

    // restore the object's color
    if (oldPickNdx >= 0) {
      globals.objectUniforms[oldPickNdx].u_colorMult = oldPickColor;
      oldPickNdx = -1;
    }

    // highlight object under mouse
    if (id > 0) {
      const pickNdx = id - 1;
      oldPickNdx = pickNdx;
      oldPickColor = globals.objectUniforms[pickNdx].u_colorMult;
      globals.objectUniforms[pickNdx].u_colorMult = //(frameCount & 0x8) ?
       globals.objectUniforms[pickNdx].u_colorMult.map(function(x,i){return i==3?1:x*1.2}) ;//: 
       //globals.objectUniforms[pickNdx].u_colorMult.map(function(x){return x});
    }
    
}
gl.canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
 });