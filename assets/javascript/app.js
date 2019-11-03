var flashCardGame = {
    chosenQuestion: '',
    answersArray: [],
    timer: false,
    chosenFlashCard: false,
    correctAnswers: 0,
    incorrectAnswers: 0,
    isAnswered: false,
    flashcards: {
        card1: {
            question: "Which code allows you to connect to an external javascript file?",
            answer: "<script src=\"otherFile.js\"></script>",
            wrongAnswers: ["<script src=otherFile.js></script>", "<script>\"otherFile.js\"</script>", "<script source=\"otherFile.js\"></script>"]
        },
        card2: {
            question: "How would you use the Javascript Query Selector to find an element with an ID of 'newId'?",
            answer: "document.querySelector(\"#newId\");",
            wrongAnswers: ["document.query(\"#newId\");", "document.querySelector(\".newId\");", "document.query(#newId);"]
        },
        card3: {
            question: "Which of the following is the proper HTML5 doctype?",
            answer: "<!DOCTYPE html>",
            wrongAnswers: ['<!doctype html>', "<doctype html>", "<DOCTYPE html>"]
        },
        card4: {
            question: "What does SQL stand for?",
            answer: "Structured Query Language",
            wrongAnswers: ["Structured Question Language", "Standard Query Language", "Strong Question Language"]
        },
        card5: {
            question: "Inside which HTML element do we put the JavaScript?",
            answer: "<script>",
            wrongAnswers: ["<javascript>", "<js>", "<scripting>"]
        },
        card6: {
            question: "How do you alert the phrase \"Hello World?\"",
            answer: "alert(\"Hello World\");",
            wrongAnswers: ['msg("Hello World");', 'msgBox("Hello World");', 'alertBox("hello World");']
        },
        card7: {
            question: "How do you create a function in JavaScript?",
            answer: "function myFunction()",
            wrongAnswers: ["function = myFunction()", "function:myFunction()", "function.newFunction = myFunction()"]
        },
        card8: {
            question: "How do you call a function named 'startFunction'?",
            answer: "startFunction()",
            wrongAnswers: ['call function startFunction()', 'call startFunction()', 'startFunction']
        },
        card9: {
            question: "Which of these is a valid IF statement?",
            answer: "if(i === 5){ do some code}",
            wrongAnswers: ['if i === 5 { do some code }', 'if i === 5 then( do some code )', 'if(i = 5){ do some code}']
        },
        card10: {
            question: "Which of these is a valid FOR loop?",
            answer: "for(let i = 0; i < arr.length; i++) { do some code }",
            wrongAnswers: ["for(let i = 0; i++; i < arr.length) { do some code }", "for(let i = 0, i < arr.length, i++) { do some code }", "for(arr.each){ do some code }"]
        }
    
    },
    startGame: function(){
        flashCardGame.startTimer();
        flashCardGame.chooseQuestion();
        flashCardGame.displayQuestion();
        
    },
    startTimer: function(){
        clearInterval(flashCardGame.timer);
        var secondsRemaining = 29;
        flashCardGame.timer = setInterval(function(){
            $('#timeRemaining').text(secondsRemaining);
            if(secondsRemaining === 0){
                flashCardGame.incorrectAnswers++;
                $('#incorrect').text(flashCardGame.incorrectAnswers);
                flashCardGame.isAnswered = true;
                clearInterval(flashCardGame.timer);
                flashCardGame.showCorrectAnswer();
                flashCardGame.newQuestion();
            }else{
                secondsRemaining--;
            }
       }, 1000);
    },
    chooseQuestion: function(){
        var randomFlashCard = Object.keys(flashCardGame.flashcards)[Math.floor(Math.random() * Object.keys(flashCardGame.flashcards).length)];
        flashCardGame.chosenFlashCard = flashCardGame.flashcards[randomFlashCard];
        flashCardGame.chosenQuestion = flashCardGame.chosenFlashCard.question;
        var tempAnswers = [];
        tempAnswers.push(flashCardGame.chosenFlashCard.answer);
        flashCardGame.chosenFlashCard.wrongAnswers.forEach(answer => {
            tempAnswers.push(answer);
        });
        for (let i = tempAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempAnswers[i], tempAnswers[j]] = [tempAnswers[j], tempAnswers[i]];
        }
        flashCardGame.answersArray = tempAnswers;
            
    },
    displayQuestion: function(){
        $('#question').text(flashCardGame.chosenQuestion);
        flashCardGame.answersArray.forEach(answer => {
            $('.answer').each(function (indexInArray) { 
                 $(this).text(flashCardGame.answersArray[indexInArray]);
            }); 
        });
    },
    checkAnswer: function(){
        if(!flashCardGame.isAnswered){
            flashCardGame.isAnswered = true;
            if($(this).text() === flashCardGame.chosenFlashCard.answer){
                clearInterval(flashCardGame.timer);
                flashCardGame.correctAnswers++;
                $('#correct').text(flashCardGame.correctAnswers);
            }else{
                clearInterval(flashCardGame.timer);
                flashCardGame.incorrectAnswers++;
                $('#incorrect').text(flashCardGame.incorrectAnswers);
            }
            flashCardGame.newQuestion();
            flashCardGame.showCorrectAnswer();        
        }

    },
    showCorrectAnswer: function(){
        $('.answer').each(function(index){
            if($(this).text() === flashCardGame.chosenFlashCard.answer){
                $(this).addClass("correctAnswer");
            }else{
                $(this).addClass("wrongAnswer");
            }
        });
    },
    newQuestion: function(){
        setTimeout(function(){
            $('#timeRemaining').text('30');
            $('.answer').each(function(index){
                $(this).removeClass("correctAnswer");
                $(this).removeClass('wrongAnswer');
            });
            flashCardGame.isAnswered = false;
            flashCardGame.startGame();
        }, 1000 * 5);
    }   
};

//Set timer to 30 seconds and countdown once per second
//Display question and 4 possible answers
// Allow possible answers to be clicked
//Check to see if clicked answer is correct
//If correct, show corresponding notice
//In incorrect, notify user and show correct answer
//After 10 seconds, automatically move on to next question.


$('#startButton').on('click', function(){
    flashCardGame.startGame();
    $('#startButton').hide();
    $('.answer').on('click', flashCardGame.checkAnswer);
})
