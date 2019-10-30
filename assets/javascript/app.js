var flashCardGame = {
    chosenQuestion: '',
    answersArray: [],
    timer: false,
    randomFlashCard: false,
    flashcards: {
        card1: {
            question: "Which code allows you to connect to an external javascript file?",
            answer: "&lt;script src=\"otherFile.js\"&gt;&lt;/script&gt;",
            wrongAnswers: ["&lt;script src=otherFile.js&gt;&lt;/script&gt;", "&lt;script&gt;\"otherFile.js\"&lt;/script&gt;", "&lt;script source=\"otherFile.js\"&gt;&lt;/script&gt;"]
        },
        card2: {
            question: "How would you use the Javascript Query Selector to find an element with an ID of 'newId'?",
            answer: "document.querySelector(\"#newId\");",
            wrongAnswers: ["document.query(\"#newId\");", "document.querySelector(\".newId\");", "document.query(#newId);"]
        },
    },
    startGame: function(){
        flashCardGame.chooseQuestion();
        flashCardGame.displayQuestion();
        $('.answerChoice').on('click', flashCardGame.checkAnswer);
            // if($(this).html() === flashCardGame.randomFlashCard.answer){
            //     console.log('true');
            // }else{
            //     console.log('false');
            // }
        // })
    },
    startTimer: function(){
        var secondsRemaining = 30;
        flashCardGame.timer = setInterval(function(){
            $('#timeRemaining').text(secondsRemaining);
            if(secondsRemaining === 0){
                clearInterval(flashCardGame.timer);
            }else{
                secondsRemaining--;
            }
       }, 1000);
    },
    chooseQuestion: function(){
        flashCardGame.randomFlashCard = flashCardGame.flashcards[Object.keys(flashCardGame.flashcards)[Math.floor(Math.random() * Object.keys(flashCardGame.flashcards).length)]];
        flashCardGame.chosenQuestion = flashCardGame.randomFlashCard.question;
        var tempAnswers = [];
        tempAnswers.push(flashCardGame.randomFlashCard.answer);
        flashCardGame.randomFlashCard.wrongAnswers.forEach(answer => {
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
            $('#answers').append("<pre value=true class=answerChoice>" + answer + "</pre>" ); 
        });
    },
    checkAnswer: function(){
        if($(this).html() === flashCardGame.randomFlashCard.answer){
            console.log('true');
        }else{
            console.log('false');
        }
    }

    
};

//Set timer to 30 seconds and countdown once per second
//Display question and 4 possible answers
// Allow possible answers to be clicked
//Check to see if clicked answer is correct
//If correct, show corresponding notice
//In incorrect, notify user and show correct answer
//After 10 seconds, automatically move on to next question.

flashCardGame.startGame();