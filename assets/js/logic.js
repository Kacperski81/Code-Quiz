var btn = document.querySelector('#start');
var startScreen = document.querySelector('#start-screen');
var questionsWrapper = document.querySelector('#questions');
var questionTitle = document.querySelector('#question-title');
var choices = document.querySelector('#choices');
var timeElement = document.querySelector('#time');
var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');
var submitBtn = document.querySelector('#submit');
var userInitialsInput = document.querySelector('#initials');
var feedback = document.querySelector('#feedback');
var userScores = JSON.parse(localStorage.getItem('score')) || [];
var quizTime = 75;
var userInitials = "";
var questionNumber = 0;
var userAnswer;

// show question to the user
function showQuestion(number) {
    questionsWrapper.classList.remove('hide');
    if(number < questions.length) {
        questionTitle.textContent = questions[number].questionTitle;
        for(var answer in questions[number].answers) {
            choices.insertAdjacentHTML('beforeend',`<button>${Number(answer) + 1}. ${questions[number].answers[answer]}</button>`);
        }  
    }
}

// end game when all questions are answered or time reaches 0
function endGame() {
    questionsWrapper.classList.add('hide');
    endScreen.classList.remove('hide');
    feedback.classList.add('hide');
    finalScore.textContent = quizTime;
    submitBtn.addEventListener('click',function() {
        userInitials += userInitialsInput.value;
        userScores = [...userScores,{initials: userInitials,score: quizTime}];
        localStorage.setItem('score',JSON.stringify(userScores));
        window.location.href = "highscores.html";
    }); 
}

// quiz logic
function startQuiz() {
    
    timeElement.textContent = quizTime;

    // start game interval
    var countDown = setInterval(function() {
        quizTime--;
        timeElement.textContent = quizTime;
        
        // check if the time for quiz is finished
        if(quizTime <= 0) {
            clearInterval(countDown);
            endGame();             
        }
    }, 1000);

    startScreen.classList.add('hide');

    // present question to the user
    showQuestion(questionNumber);

    // add event listener to the answers
    questionsWrapper.addEventListener('click',function(event) {
        // check user answer
        if(event.target.nodeName.includes('BUTTON')) {
            questionNumber++;
            // check user answer and display below question if bis answer is correct or not
            if(event.target.textContent.slice(3) === questions[questionNumber-1].correctAnswer) {
                feedback.classList.remove('hide');
                userAnswer = document.createElement('p');
                userAnswer.textContent = "Correct!";
                feedback.appendChild(userAnswer);
            } else {
                feedback.classList.remove('hide');
                userAnswer = document.createElement('p');
                userAnswer.textContent = "Wrong!";
                feedback.appendChild(userAnswer);
                quizTime -= 15;
            }
            
        }

        // check if user answer all the questions if not present another question
        if(questionNumber === 5) {
            // set half second delay to show user if his answer was correct and end quiz
            setTimeout(() => {
                endGame(); 
            }, 500);
            clearInterval(countDown);
            // set half second delay to show user if his answer was correct and show next question
        } else {
            setTimeout(() => {
                questionsWrapper.classList.add('hide');
                choices.textContent = "";
                showQuestion(questionNumber);
                userAnswer.textContent = "";
            }, 500);
        }
    });
}

// add event listener to start button and start the quizz
btn.addEventListener('click', startQuiz);


