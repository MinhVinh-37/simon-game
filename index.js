var lightedButtons = [];
var pressedButtons = [];
var level = 1;
const colorValue = {
  green: 0,
  red: 1,
  yellow: 2,
  blue: 3,
};
const reverseColorValue = {
  0: "green",
  1: "red",
  2: "yellow",
  3: "blue",
};
function activeGame() {
  $("body").on("keypress", () => {
    // Start the game!
    $(".title").text("Level 1");
    $("body").off();
    lightButton();
    activePressButton();
  });
}

function lightButton() {
  var randomColorValue = Math.floor(Math.random() * 4);
  color = reverseColorValue[randomColorValue];
  lightedButtons.push(color);
  $("#" + color).addClass("light");
  setTimeout(() => {
    $("#" + color).removeClass("light");
  }, 500);
}

function activePressButton() {
  $(".button").on("click", (event) => {
    pressedColor = event.currentTarget.id;
    $("#" + pressedColor).addClass("pressed");
    setTimeout(() => {
      $("#" + pressedColor).removeClass("pressed");
    }, 200);
    new Audio("./sounds/" + pressedColor + ".mp3").play();
    pressedButtons.push(pressedColor);
    var indexCompare = pressedButtons.length - 1;
    if (pressedButtons[indexCompare] == lightedButtons[indexCompare]) {
      if (indexCompare == lightedButtons.length - 1) {
        nextLevel();
      }
    } else {
      youLose();
    }
  });
}

function nextLevel() {
  pressedButtons = [];
  level += 1;
  $(".title").text("Level " + level);
  lightButton();
}

function youLose() {
  showErrorScreen();
  resetParams();
}

function showErrorScreen() {
  $(".title").text("Wrong bro, press any key to restart!");
  $("body").addClass("lose");
  setTimeout(() => {
    $("body").removeClass("lose");
  }, 500);
  new Audio("./sounds/wrong.mp3").play();
}

function resetParams() {
  $(".button").off();
  lightedButtons = [];
  pressedButtons = [];
  level = 1;
  setTimeout(activeGame, 1000);
}

activeGame();
