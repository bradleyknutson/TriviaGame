var flashCardGame = {
    chosenQuestion: '',
    answersArray: [],
    flashcards: {
        card1: {
            question: "Which code allows you to connect to an external javascript file?",
            answer: "<script src=\"otherFile.js\"></script>",
            wrong1: "<script src=otherFile.js></script>",
            wrong2: "<script>\"otherFile.js\"</script>",
            wrong3: "<script source=\"otherFile.js\"></script>"
        },
        card2: {
            question: "How would you use the Javascript Query Selector to find an element with an ID of 'newId'?",
            answer: "document.querySelector(\"#newId\");",
            wrong1: "document.query(\"#newId\");",
            wrong2: "document.querySelector(\".newId\");",
            wrong3: "document.query(#newId);"
        },
    },
    startTimer: function(){
        var secondsRemaining = 30;
        var timer = setInterval(function(){
            $('#timeRemaining').text(secondsRemaining);
            if(secondsRemaining === 0){
                clearInterval(timer);
            }else{
                secondsRemaining--;
            }
       }, 1000);
    },
    chooseQuestion: function(){
        var randomFlashCard = flashCardGame.flashcards[Object.keys(flashCardGame.flashcards)[Math.floor(Math.random() * Object.keys(flashCardGame.flashcards).length)]];
        console.log(randomFlashCard);
    },
    displayQuestion: function(){

    }
};

//Set timer to 30 seconds and countdown once per second
//Display question and 4 possible answers
// Allow possible answers to be clicked
//Check to see if clicked answer is correct
//If correct, show corresponding notice
//In incorrect, notify user and show correct answer
//After 10 seconds, automatically move on to next question.

flashCardGame.chooseQuestion();