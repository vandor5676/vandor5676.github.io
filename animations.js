let fallFlag = false;
let treeShakeFlag = false;

let frameStopCount;
let animationDuration = 25;

//click on object
gl.canvas.addEventListener('mousedown', (e) => {
    var objects ={
      leaves:0,
      dirt:1,
    }    
    if(globals.objectUniforms[objects.leaves].isHovered == true)
      {
          //tree leaves
          fallFlag = true;
          treeShakeFlag  =true;
          frameStopCount = globals.frameCount + animationDuration;
          //alert("Tree");
      }
      else if(globals.objectUniforms[objects.dirt].isHovered == true)
      {
          //dirt
        alert("Dirt");
      }
   });

   //creates fake gravity
function animateGravity(itemHeight)
{
    if(!fallFlag) return itemHeight;
    if(itemHeight> groundHeight)
    {
        itemHeight-=gravity;
        gravity = gravity*1.05;
        return itemHeight;
    }    
    return groundHeight;
}
   //creates tree shake
function animateTreeShake(treeXLoc, frameCount)
{
    if(!treeShakeFlag) return 0;
    if(frameCount >= frameStopCount) return 0;
    // if(itemHeight> groundHeight)
    // {
    //     itemHeight-=gravity;
    //     gravity = gravity*1.05;
    //     return itemHeight;
    // }
    treeShakeAudio.play();
    return treeXLoc + Math.cos(frameCount) *0.1;
}
