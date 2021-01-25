//alert("Connected");
//$("h1").css("color", "red");

//declaring initial variables
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 1;

//Starting the game with keypress

$(document).keypress(function(event){
  console.log(event.which);
  nextSequence();
})

//After clicking the colored tiles

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  //console.log("User: " + userClickedPattern);
  //console.log("ID: "+this.id);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//Function to get next number in sequence

function nextSequence(){
  var randomNumber = Math.round(Math.random()*3) ;
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  //console.log("Game: "+ gamePattern);

  $("#"+randomChosenColour).fadeOut(250).fadeIn(250);

  playSound(randomChosenColour);

  $('h1').html("Level " + level);

  level = level + 1;
}

//Function to play sounds

function playSound(name){
  var newAudio = new Audio('sounds/'+name+'.mp3');
  newAudio.play();
}

//Funtion to give animation effect when tile is clicked

function animatePress(currentColour){
  $('#'+currentColour).addClass('pressed');
  setTimeout(function(){
  $("#"+currentColour).removeClass('pressed');
  }, 100);
 }

//Function to check if correct sequence is folloe=wed or not

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel] && userClickedPattern.length < gamePattern.length){
    console.log("Success");
  }

  else if(userClickedPattern[currentLevel]==gamePattern[currentLevel] && userClickedPattern.length == gamePattern.length){
    clicks = 0;
    userClickedPattern = [];
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }

  else{
    console.log("Failure");
    playSound('wrong');
    $('body').addClass('game-over');

    setTimeout(function(){
      $('body').removeClass('game-over');
    }, 200);

    $('h1').html('Game-Over😓!! Press any key to continue.');
    startOver();
  }
}

//Restart the game

function startOver(){
  level = 1;
  gamePattern = [];
  userClickedPattern = [];
}
