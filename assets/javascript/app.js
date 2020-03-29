// Set a var for the Interval
var timerInterval;

// When the page loads, start a countdown timer of 2 minutes and display it on the html
// Function to start the timer counting backwards, decreasing by 1 every second
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            getTheScore();
        }
    }, 1000);
}

// Create a var to have the timer run for two minutes
var twoMinutes;

// When page loads, start a countdown timer of 2 minutes
$(document).ready(function(){
    twoMinutes = 60 * 2,
        display = $('#time');
    startTimer(twoMinutes, display);
});

// Create global vars to hold the user's correct, wrong, and unanswered results
var correct = 0;
var wrong = 0;
var unanswered = 0;

// Create global vars to reference the results text on the html
var correctAnswersText = $("#correctanswers-text");
var wrongAnswersText = $("#wronganswers-text");
var unansweredText = $("#unanswered-text");

// Function to get the score
function getTheScore() {
    // Vars to hold the score
    correct = 0;
    wrong = 0;
    unanswered = 0;
    // Stop the timer
    clearInterval(timerInterval);
    // Object referencing the question names on the html
    var questionNames = [
        "first-question",
        "second-question",
        "third-question",
        "fourth-question"
    ]
    // For loop grabbing the question names and determining the correct answer for each question and adding the scores together
    for (name of questionNames) {
        var answer = $('input[name="' + name + '"]:checked').val();
        if (answer === "Right") {
            correct++;
        } else if (answer === "Wrong") {
            wrong++;
        } else {
            unanswered++;
        }
    }
    // Display the score on the page
    correctAnswersText.text("Correct answers: " + correct);
    wrongAnswersText.text("Wrong answers: " + wrong);
    unansweredText.text("Unanswered questions: " + unanswered);
}

// When you hit the submit button, the getTheScore function is called
$("#submit-button").click(function() {
    getTheScore();
});

// Create a function to restart the game
function restart() {
    startTimer(twoMinutes, display);
    twoMinutes = 60 * 2;
    correct = 0;
    wrong = 0;
    unanswered = 0;
    correctAnswersText.text("Correct answers: " + correct);
    wrongAnswersText.text("Wrong answers: " + wrong);
    unansweredText.text("Unanswered questions: " + unanswered);
    $('input[type="radio"]').prop('checked', false);
};

// Calling the restart function so when you hit the restart button, the game resets
$("#restart-button").click(function() {
    restart();
});
