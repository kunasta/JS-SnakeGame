// Get canvas and initial settings
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var w = 450;
var h = 450;
var score = 0;
var snake;
var partSize = 10;
var food;
var roundNumb = 1;
var eatenFoodCount = 0;
var MAX_FOOD_ITEMS = 5;
var gameSpeed = 80;

var btn = document.getElementById('btn');

//Start button calls init function
btn.addEventListener("click", function () {
    drawModule.init();
});

//key events
document.onkeydown = function (event) {

    keyCode = window.event.keyCode;
    keyCode = event.keyCode;

    switch (keyCode) {

        case 37:
            if (direction != 'right') {
                direction = 'left';
            }
            console.log('left');
            break;

        case 39:
            if (direction != 'left') {
                direction = 'right';
                console.log('right');
            }
            break;

        case 38:
            if (direction != 'down') {
                direction = 'up';
                console.log('up');
            }
            break;

        case 40:
            if (direction != 'up') {
                direction = 'down';
                console.log('down');
            }

            break;


    }

}
//start timer
var timer;
var startTimer = function () {
    var sec = 0;
    function pad(val) {
        return val > 9 ? val : "0" + val;
    }
    
    timer = setInterval(function () {
        $("#seconds").html(pad(++sec % 60));
        $("#minutes").html(pad(parseInt(sec / 60)));
    }, 1000);
}

// stop timer 
function stopTimer() {

    clearTimeout(timer);
}