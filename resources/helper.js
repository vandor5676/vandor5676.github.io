function hexToRgbVec4(hex) {
    var arrBuff = new ArrayBuffer(4);
    var vw = new DataView(arrBuff);
    vw.setUint32(0,parseInt(hex, 16),false);
    var arrByte = new Uint8Array(arrBuff);
  
    return [arrByte[1]/255 , arrByte[2]/255 , arrByte[3]/255,1];
  }

  function computeMatrix(viewProjectionMatrix, translation, yRotation,scale) {
    var matrix = m4.translate(viewProjectionMatrix,
        translation[0],
        translation[1],
        translation[2]);
    if(scale!=undefined)matrix = m4.scale(matrix, scale[0],scale[1],scale[2]);
    return m4.yRotate(matrix, yRotation);
  }

  function appleAnimation(viewProjectionMatrix, translation, yRotation) {
    var matrix = m4.translate(viewProjectionMatrix,
        translation[0],
        translation[1],
        translation[2]);
    //matrix = m4.xRotate(matrix, xRotation);
    return m4.yRotate(matrix, yRotation);
  }

  //return random number in range
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function eMod(x, n) {
    return x >= 0 ? (x % n) : ((n - (-x % n)) % n);
  }

  function flatten( v )
{

    if(isVector(v)) {
      var floats = new Float32Array(v.length)
      for(var i =0; i<v.length; i++) floats[i] = v[i];
      return floats;
    }
    if(isMatrix(v)) {

        var floats = new Float32Array(v.length*v.length);
        for(var i =0; i<v.length; i++) for(j=0;j<v.length; j++) {
          floats[i*v.length+j] = v[j][i];
        }
        return floats;
      }

      var floats = new Float32Array( v.length*v[0].length  );

      for(var i = 0; i<v.length; i++) for(var j=0; j<v[0].length; j++) {
        floats[i*v[0].length+j] = v[i][j];
      }
      return floats;
}

function isVector(v) {
  if(v.type == "vec2" || v.type == "vec3" || v.type == "vec4") return true;
  return false;
}

function isMatrix(v) {
  if(v.type == "mat2" || v.type == "mat3" || v.type == "mat4") return true;
  return false;
}

function mat4()
{
    //var v = _argumentsToArray( arguments );

    var out = new Array(4);
    out[0] = new Array(4);
    out[1] = new Array(4);
    out[2] = new Array(4);
    out[3] = new Array(4);

    switch ( arguments.length ) {
    case 0:
      out[0][0]=out[1][1]=out[2][2]=out[3][3] = 1.0;
      out[0][1]=out[0][2]=out[0][3]=out[1][0]=out[1][2]=out[1][3]=out[2][0]=out[2][1]
        =out[2][3]=out[3][0]=out[3][1]=out[3][2]=0.0;

      break;

    case 1:
      for(var i=0; i<4; i++) for(var i=0; i<4; i++) {
        out[i][j]=arguments[0][4*i+j];
      }
      break;

    case 4:
      if(arguments[0].type == "vec4") {
      for( var i=0; i<4; i++)
        for(var j=0; j<4; j++)
          out[i][j] = arguments[i][j];
       break;
      }

    case 16:
      for(var i=0; i<4; i++) for(var j=0; j<4; j++) {
        out[i][j] = arguments[4*i+j];
      }
      break;
    }
    out.type = 'mat4';

    return out;
}