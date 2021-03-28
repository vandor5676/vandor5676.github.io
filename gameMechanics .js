// for game values
var money = 0;

function updateMoney(value)
{
    money = money + value;
    $("#money").html(money.toString());
}