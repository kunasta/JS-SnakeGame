
//drawings
var drawModule = (function () {

    //snake body parts setup
    var bodySnake = function (x, y) {
        //property for color setup
        ctx.fillStyle = '#d6415b';
        //x pos,y pos, width, height of the element
        ctx.fillRect(x * partSize, y * partSize, partSize, partSize);

    }

//food setup
    var foodItem = function (x, y) {
        ctx.fillStyle = 'cyan';
        ctx.fillRect(x * partSize, y * partSize, partSize, partSize);

    }

// score tracker setup
    var scoreText = function () {
        var score_text = "Score: " + score;
        ctx.fillStyle = 'blue';
        // text, x, y pos
        ctx.fillText(score_text, 145, h - 5);
    }

//draw snake
    var drawSnake = function () {
        var length = 4;
        snake = [];
        for (var i = 0; i < length; i++) {
            //start position
            snake.push({x: i, y: 10});
        }
    }
//painting work
    var paint = function () {

        //canvas painting
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, w, h);
        // set round number
        $('#round').html(roundNumb);
        // button is disabled while game is in proccess
        btn.setAttribute('disabled', true);
        //paint snake
        //snake head position
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;
        //snake move 
        if (direction == 'right') {
            snakeX++;
        } else if (direction == 'left') {
            snakeX--;
        } else if (direction == 'up') {
            snakeY--;
        } else if (direction == 'down') {
            snakeY++;
        }


        //check for crash
        if (snakeX == -1 || snakeX == w / partSize || snakeY == -1 || snakeY == h / partSize || checkCrash(snakeX, snakeY, snake)) {
//restart game
            //enable 'Start' button
            btn.removeAttribute('disabled', true);
            //erase all previous drawing
            ctx.clearRect(0, 0, w, h);
            //stops the game
            gameloop = clearInterval(gameloop);
            stopTimer();
            showGameOver();

            $('#round').html(roundNumb);
            return;

        }
//snake eats the food
        //aligned snake with the food x and y
        if (snakeX == food.x && snakeY == food.y) {
            //Create a new head instead of moving the tail
            var tail = {x: snakeX, y: snakeY};
            score++;
            eatenFoodCount++;
            if (eatenFoodCount >= MAX_FOOD_ITEMS) {
                startNextRound();
                $('#round').html(roundNumb);
            }
            //Create new food
            createFood();
        } else {
            //pops out the last cell and put on head
            var tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }
        //The snake can now eat the food.
        //add to array head
        snake.unshift(tail);

        for (var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
        }

        foodItem(food.x, food.y);

        scoreText();
    }
    function startNextRound() {

        roundNumb++;
        eatenFoodCount = 0;
        gameSpeed = Math.floor(gameSpeed * 0.6);
        clearInterval(gameloop);
        gameloop = setInterval(paint, gameSpeed);

    }
    var createFood = function () {
        //generate random position
        food = {
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }

//check snake pos and move food from it
        for (var i = 0; i > snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x === snakeX && food.y === snakeY) {

                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }
//check if the provided x/y coordinates exist in an array of cells or not
    var checkCrash = function (x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y)
                return true;
        }
        return false;
    }

    var showGameOver = function () {

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, w, h);
        ctx.font = '20px sans-serif';
        ctx.fillStyle = "orange";
        ctx.fillText('Game Over!', 150, 100);
        ctx.font = '12px sans-serif';
        ctx.fillText('Your Score: ' + score, 165, 150);
        ctx.fillText('Round: ' + roundNumb, 165, 180);

    }



    var init = function () {
        direction = 'down';
        drawSnake();
        createFood();
        roundNumb = 1;
        startTimer();

        //refresh/painting speed
        gameloop = setInterval(paint, 80);
        score = 0;
    }


    return {
        init: init
    };


}());
