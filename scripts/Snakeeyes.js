var score = 0;
var dicespace1 = document.getElementById("0");
var dicespace2 = document.getElementById("1");
var goCount; //turn count
var cardTurn = true; //cardOver
var buttonRoll = document.getElementById("roll");
var guess;
buttonRoll.addEventListener("click", diceroll);

function diceroll()
{
    var diceroll1 = Math.floor((Math.random()*6)+1);
    var diceroll2 = Math.floor((Math.random()*6)+1);
    console.log(diceroll1);
    console.log(diceroll2);
    dicespace1.setAttribute("src", "imagessnake/dice" + diceroll1 + "_black.png");
    dicespace2.setAttribute("src","imagessnake/dice" + diceroll2 + "_red.png");
    
    buttonRoll.value = "Roll Dice Again";
        if (diceroll1 == diceroll2)
            { score += 100;}
            else
            {score += diceroll1; score += diceroll2;}
    document.getElementById("score").innerHTML += "<p>Dice 1 : " + diceroll1 + " / Dice 2 : " + diceroll2 + " / Score : " + score + "</p>";
    
    if(diceroll1 == 1 && diceroll2 ==1)
        {buttonRoll.value = "Begin"
        score -= 100;
        document.getElementById("score").innerHTML = "<p> Congratulations, you have won. Your total score is" + score + "</p>";
            score = 0;}
    document.getElementById("score").innerHTML = score;
    console.log("Your Score is " + score);
    
}


