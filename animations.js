let appleFallFlag = false;
let treeShakeFlag = false;
let appleFullGrothFlag = false;

let frameStopCount;
let animationDuration = 25;

//click on object
gl.canvas.addEventListener('mousedown', (e) => {
    var objects = {
        leaves: 0,
        dirt: 1,
        apples: 3,
    }
    if (globals.objectUniforms[objects.leaves].isHovered == true) {
        //tree leaves
        appleFallFlag = true;
        treeShakeFlag = true;
        frameStopCount = globals.frameCount + animationDuration;
        //alert("Tree");
    }
    else if (globals.objectUniforms[objects.dirt].isHovered == true) {
        //dirt
        alert("Dirt");
    }
    else if (globals.objectUniforms[objects.apples].isHovered == true) {
        //dirt
        pickUpApple();
        //alert("Apples");
    }
});

//creates fake gravity
function animateGravity(itemHeight) {
    //when to stop
    if (!appleFallFlag || !appleFullGrothFlag) return itemHeight;
   //if the apple above the ground
    if (itemHeight > groundHeight) {
        //change item height and update gravity
        itemHeight -= gravity;
        gravity = gravity * 1.05;
        return itemHeight;
    }
    if (itemHeight < groundHeight) grassThudAudio.play();
    return groundHeight;
}
//creates tree shake
function animateTreeShake(treeXLoc, frameCount) {
    //when to stop
    if (!treeShakeFlag) return 0;
    if (frameCount >= frameStopCount) return 0;

    //animation and sound
    treeShakeAudio.play();
    return treeXLoc + Math.cos(frameCount) * 0.1;
}
// sound when apples are picked up
function pickUpApple(treeXLoc, frameCount) {
    //when to stop and return
    if (!appleFallFlag ) return 0;
    
    //animation and sound
    itemPickupAudio.play();
    //reset apple location
    appleLocationList = [
        [7, 22, 0],
        [4.12, -1 + 30, -8.66],
        [-7, -4 + 30, -4],
        [-8, 4 + 30, 3],
    ]
    //reset gravity,fall flag and apple size
    gravity = 0.1;
    appleFallFlag = false;
    appleScale = [0.3,0.3,0.3];

}
//function for apple groth
function slowGroth(stop, value, groth)
{
    if(value<stop)
    {
        appleFullGrothFlag = false;
        return value +groth;
    } 

    else
    {
        appleFullGrothFlag = true;
        return stop;
    }  

}
