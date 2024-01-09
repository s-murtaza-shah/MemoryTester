var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var gameBegan = false;
var gameOver = false;
var level = 0;
var currentLevel = -1;

function animatePress(btnColour) {
    $("#" + btnColour).addClass("pressed");
    setTimeout( () => {
        $("#" + btnColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var randomBtnAudio = new Audio("./sounds/" + name + ".mp3");
    randomBtnAudio.play();
}

function nextSequence() {
    currentLevel = -1;
    userPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNum = Math.floor(Math.random() * 4);
    var randomColour = buttonColours[randomNum];
    gamePattern.push(randomColour);
    $("#" + randomColour).fadeOut().fadeIn();
    playSound(randomColour);
}

function gameOverFcn() {
    gameOver = true;
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout( () => {
        $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
}

function resetGame() {
    gameBegan = false;
    gameOver = false;
    gamePattern = [];
    level = 0;
}

function checkAnswer(currentLevel) {
    if (currentLevel >= level || userPattern[currentLevel] !== gamePattern[currentLevel]) {
        gameOverFcn();
    } else if (currentLevel == level - 1) {
        setTimeout(nextSequence, 1000);
    }
}

$(".btn").click( function() {
    if (gameOver) {
        gameOverFcn();
    } else {
        var userClicked = this.getAttribute("id");
        playSound(userClicked);
        animatePress(userClicked);
        userPattern.push(userClicked);
        currentLevel++;
        if (gameBegan) checkAnswer(currentLevel); 
    }   
});

$(document).keypress( function() {
    if (!gameBegan) {
        gameBegan = true;
        nextSequence();
    }
    else if (gameOver) {
        resetGame();
        gameBegan = true;
        nextSequence();
    }
});
