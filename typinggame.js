/*
 * Typing Game written by canvas. 
 *
 */

var margin = 15;
window.onload = init;

var typedTextX = 100 
var typedTextY = 100

// 65 - 90 and 97 - 124
var alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

// 48 - 57
var numbers  = ['0','1','2','3','4','5','6','7','8','9']

// 33 - 47
var symbols1  = ['!','\"','#','%','&','\'','\(','\)','*','+',',','-','.','/']
// 58 - 64
var symbols2  = [':',';','<','=','>','?','@']
// 91 - 96
var symbols3  = ['\[', '\\','\]','^','_','`']
// 123 - 126
var symbols4  = ['\{', '|','\}','~']


var questions = [
                    [['S','A','M','P','L','E'], "sample"],
                    [['S', '1', 'M', 'P', 'L', 'E', '2'], "s1mple2"],
                    [['T', 'A', 'N', 'O', 'S', 'H', 'I', 'I'], "楽しい"],
                    [['S', 'U', 'G', 'O', '-', 'I'], "すごーい"]
                ];

var displayMargin = 50;

var numberOfQuestions = 10;

var countCombo = 0;
var countLength = 0;
var countSentence = 0;

// game mode list
var FINISH = 0
var GAMENOW = 1

// initiarize mode
var mode = GAMENOW;

// initiarize time limit
var LIMIT = 10;
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
        initGame();
    }
}

/*
 * any alphabet key down event.
 *
 */

var maxCombo = 0;

function addCombo() {
        countCombo += 1; 

        if (countCombo > maxCombo) {
            maxCombo = countCombo;
        }

        writeCombo();
}

function onKeyDown(e) {

    var code   = e.keyCode;
    var answer = "";

    if (mode == FINISH) {
        initGame();
        return;
    }

    context.fillStyle='black';

    if (code >= 33 && code <= 189) {
        if (code >= 65 && code <= 90) {   
            answer = alphabets[code - 65];
        } else if (code >= 97 && code <= 124) {
            answer = alphabets[code - 97];
        } else if (code >= 48 && code <= 57) {
            answer = numbers[code - 48];
        } else if (code === 189) { // for '-'
            answer = symbols1[11];
        }

        if (answer != questions[countSentence][0][countLength]) {
            countCombo = 0; 
            return;
        }

        console.log(answer);

        addCombo();

        context.fillStyle = 'black';
        context.font = '15px _sans';
        context.fillText(answer, typedTextX, typedTextY);
        typedTextX += 15;
        countLength += 1; 

        if (countLength >= questions[countSentence][0].length) {
            if (countSentence < questions.length - 1) {
                nextSentence();
            } else {
                finish();
            }
        }

    }
}

function nextSentence() {
    countSentence++;
    typedTextX = 100;
    startGame();
}

function initGame() {

    countSentence = 0;
    countLength = 0;
    countCombo = 0;
    typedTextX = 100;
    mode = GAMENOW;
    time = LIMIT;    

    startGame();
}

function writeCombo() {
    var combo = "COMBO: " + countCombo;
    context.fillStyle = 'yellow';
    context.fillRect(canvasWidth - (displayMargin * 3) - 170, canvasHeight * 0.7 + 10, 120, -30);
    context.fillStyle = 'green';
    context.font = '15px _sans';
    context.fillText(combo, canvasWidth - (displayMargin * 3) - 150, canvasHeight * 0.7);
}

function startGame() {

    var sentenceX = typedTextX;
    var sentenceY = 170;

    context.fillStyle = backGroundColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    context.fillStyle='white';
    context.fillRect(displayMargin, typedTextY - 20, canvasWidth - (displayMargin * 2), 30);

    // initialize timer
    writeTimeBox();

    writeCombo();

    context.fillStyle='white';
    context.fillRect(displayMargin, sentenceY - 50, canvasWidth - (displayMargin * 2), 100);

    countLength = 0;
    context.fillStyle = 'black';
    context.font = '30px _sans';
    context.fillText(questions[countSentence][1], sentenceX, sentenceY);
}

function writeMaxCombo() {

    var maxComboBoxX = displayMargin;
    var maxComboBoxY = canvasHeight / 2;
    var combo  = "MAX COMBO: " + maxCombo;

    context.fillStyle = '#f0f8ff';
    context.fillRect(maxComboBoxX, maxComboBoxY + 30, canvasWidth - (displayMargin * 2) + 10, -70);

    var maxComboX = canvasWidth / 2 - 120;
    var maxComboY = canvasHeight / 2;

    context.fillStyle = '#3300ee';
    context.font = '20px _sans';
    context.fillText(combo, maxComboX, maxComboY);
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
    
    writeMaxCombo();

    mode = FINISH;
}

/*
 * time limit counter.
 *
 */

function writeTimeBox() {
        context.fillStyle = 'yellow';
        context.fillRect(canvasWidth - (displayMargin * 3) - 20, canvasHeight * 0.7 + 10, 100, -30);
}

function writeTime(time) {
        context.fillStyle = 'green';
        context.font = '15px _sans';
        context.fillText("limit: " + time, canvasWidth - (displayMargin * 3), canvasHeight * 0.7);
}

var time = LIMIT;

function timer() {
    if (mode == GAMENOW && time > 0) {
        console.log(mode);
        time--;
        writeTimeBox();
        writeTime(time);
    } else {
        mode = FINISH;
        finish();
    }
}


setInterval("timer()", 1000);
