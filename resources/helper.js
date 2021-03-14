function hexToRgbVec4(hex) {
    var arrBuff = new ArrayBuffer(4);
    var vw = new DataView(arrBuff);
    vw.setUint32(0,parseInt(hex, 16),false);
    var arrByte = new Uint8Array(arrBuff);
  
    return [arrByte[1]/255 , arrByte[2]/255 , arrByte[3]/255,1];
  }