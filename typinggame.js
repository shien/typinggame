/*
 * Typing Game written by canvas. 
 *
 */

var margin = 15;
window.onload = init;

var typedTextX = 100 
var typedTextY = 100

var alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

var questions = [
                    [['S','A','M','P','L','E'], "sample"],
                    [['S', 'A', 'M', 'P', 'L', 'E', '2'], "sample2"]
                ];

var displayMargin = 50;

var numberOfQuestions = 10;

var missCount = 0;
var count = 0;

// game mode list
var FINISH = 0
var GAMENOW = 1

// initiarize mode
var mode = GAMENOW;

// initiarize time limit
var limit = 100;
var score = 0;

var backGroundColor = '#00aaee';

function init() {
    canvas = document.getElementById('typinggame');
    if (canvas.getContext('2d')){
        context = canvas.getContext('2d');
        canvas.width = (window.innerWidth - margin);
        canvas.height = (window.innerHeight - margin);
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        window.addEventListener('keydown', onKeyDown, false);
        startGame();
    }
}

function onKeyDown(e) {

    context.fillStyle='black';

    var code   = e.keyCode;
    var answer = "";

    if (mode == FINISH) {
        return;
    }

    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
        if (code < 97) {   
            answer = alphabets[code - 65];
        } else {
            answer = alphabets[code - 97];
        }
        
        if (answer != questions[0][0][count]) {
            comboCount = 0; 
            return;
        }

        comboCount += 1; 

        var combo = "COMBO: " + comboCount

        context.fillStyle = 'yellow';
        context.fillRect(280, 380, 100, 30);
        context.fillStyle = 'green';
        context.font = '15px _sans';
        context.fillText(combo, 290, 400);

        context.fillStyle = 'black';
        context.font = '15px _sans';
        context.fillText(answer, typedTextX, typedTextY);
        typedTextX += 15;
        count += 1; 
    }

    if (count >= questions[0][0].length) {
        finish();
    }
}

function startGame() {

    var sentenceX = typedTextX;
    var sentenceY = 150;

    context.fillStyle = backGroundColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    context.fillStyle='white';
    context.fillRect(displayMargin, typedTextY - 20, canvasWidth - (displayMargin * 2), 30);

    // initialize timer
    context.fillStyle = 'yellow';
    context.fillRect(390, 380, 100, 30);

    // initialize combo 
    comboCount = 0;
    context.fillStyle = 'yellow';
    context.fillRect(280, 380, 100, 30);

    count = 0;
    context.fillStyle = 'black';
    context.font = '30px _sans';
    context.fillText(questions[0][1], sentenceX, sentenceY);
}

/*
 * game over.
 * change mode to finished.
 *
 */
function finish() {

    var finishX = (canvasWidth - 250) / 2;
    var finishY = (canvasHeight - 200) / 2;

    context.fillStyle = backGroundColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    context.fillStyle = '#f0f8ff';
    context.fillRect(displayMargin, finishY + 30, canvasWidth - (displayMargin * 2) + 10, -90);

    var finish  = "FINISH!!"
    context.fillStyle = '#3300ee';
    context.font = '50px _sans';
    context.fillText(finish, finishX, finishY);

    mode = FINISH;

}

/*
 * time limit counter.
 *
 */

var time = limit;

function timer() {
    if (mode == GAMENOW) {
        time--;
        context.fillStyle = 'yellow';
        context.fillRect(390, 380, 100, 30);
        context.fillStyle = 'green';
        context.font = '15px _sans';
        context.fillText("limit: " + time, 400, 400);
    }
}

setInterval("timer()", 1000);
