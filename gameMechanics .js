// for game values
var money = 0;

function updateMoney(value)
{
    money = money + value;
    $("#money").html(money.toString());
}

//buy carrots
$("#buyCarrotsButton").click(function()
{
    //if carrots are not already there
    if(carrotPlotFlag!=true)
    {
           carrotPlotFlag = true;
    money = money -8;
    $("#money").html(money.toString()); 
    }

})