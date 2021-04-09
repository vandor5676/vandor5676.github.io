let appleFallFlag = false;
let treeShakeFlag = false;
let appleFullGrothFlag = false;
let appleOnGroundFlag = false;

let frameStopCount;
let animationDuration = 25;

var carrotPlotFlag = false;
var carrotPlotDropSoundFlag = false;
var carrotPickupAnimation = false;
let carrotFullGrothFlag = false;

//click on object
gl.canvas.addEventListener('mousedown', (e) => {
    //objects, u_id -1
    var objects = {
        leaves: 0,
        dirt: 1,
        apples: 3,
        carrots: 5,
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
        //apples
        pickUpApple();
        //alert("Apples");
    }
    else if (globals.objectUniforms[objects.carrots].isHovered == true) {
        //carrots
        pickUpCarrots()
        //alert("CArrots");
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
function slowGroth(stop, value, groth,tag)
{
    if(value<stop)
    {
        if(tag == "apple")
        appleFullGrothFlag = false;
        return value +groth;
    } 

    else
    {
        if(tag == "apple")
        appleFullGrothFlag = true;
        if(tag == "carrot")
        carrotFullGrothFlag = true;
        return stop;
    }  

}
//function for new plot of land animation
function newLandAnimation(location,stop =0)
{
    //if land is purchased
    if(carrotPlotFlag)
    {
        //if land is in the sky
        if(location>stop)
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
            return stop;
        }
    }
    return location;
}

function pickUpCarrots()
{
    if(carrotFullGrothFlag)
    carrotPickupAnimation = true;

}
function pickUpCarrotsAnimation()
{
    let upSpeed = 0.05;
    let carrotStopHieght = 25;
    for(let i=0;i<carrotLocationList.length;i++)
    {
        if(carrotLocationList[i][1]<=carrotStopHieght)
        carrotLocationList[i][1]=carrotLocationList[i][1]+upSpeed;
        else 
        {
            itemPickupAudio.play();
            carrotPickupAnimation = false;
             carrotLocationList = [
                [7+27, 14 , 0],
                [4.12+27,14, -8.66],
                [-7+27, 14, -4],
                [-0+27, 14, 6],
                [8+27, 14, 5],
                [4+27, 14, 2],
                [-4+27, 14, 2],
            
            ]
            carrotStopHeight = 14;
             carrotScale = [0.1,0.1,0.1];
             carrotFullGrothFlag =false;
             updateMoney(7);
            return carrotStopHieght;   
        }
    }
    carrotStopHeight = carrotStopHeight + upSpeed;

}

