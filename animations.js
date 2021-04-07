let appleFallFlag = false;
let treeShakeFlag = false;
let appleFullGrothFlag = false;
let appleOnGroundFlag = false;

let frameStopCount;
let animationDuration = 25;

var carrotPlotFlag = false;
var carrotPlotDropSoundFlag = false;

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
        //alert("Dirt");
    }
    else if (globals.objectUniforms[objects.apples].isHovered == true) {
        //dirt
        pickUpApple();
        //alert("Apples");
    }
});

//creates fake gravity for apples
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
    appleOnGroundFlag = true;
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
    if (!appleFallFlag  || !appleOnGroundFlag) return 0;
    
    //animation and sound
    itemPickupAudio.play();
    //reset apple location
    appleLocationList = [
        [7, 22, 0],
        [4.12, -1 + 30, -8.66],
        [-7, -4 + 30, -4],
        [-8, 4 + 30, 3],
    ]
    //reset gravity,fall flag , apple size and appleOnGroundFlag
    gravity = 0.1;
    appleFallFlag = false;
    appleScale = [0.3,0.3,0.3];
    appleOnGroundFlag = false;
    //update money
    updateMoney(4);

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
//function for new plot of land animation
function newLandAnimation(location)
{
    //if land is purchased
    if(carrotPlotFlag)
    {
        //if land is in the sky
        if(location>0)
        {
            //if land is almost hit the bottom play audio
            if(location ==1)
            bigThudAudio.play();
            //lowwer land from sky
            return location-1;
        }        
        else 
        {       
            //keep land in place once it hits the bottom     
            return 0;
        }
    }
    return location;
}

