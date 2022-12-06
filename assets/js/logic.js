var btn = document.querySelector('#start');
var startScreen = document.querySelector('#start-screen');
var questionsWrapper = document.querySelector('#questions');
var questionTitle = document.querySelector('#question-title');
var choices = document.querySelector('#choices');
var timeElement = document.querySelector('#time');
var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');
var submitBtn = document.querySelector('#submit')
var userInitialsInput = document.querySelector('#initials');
var userScores = JSON.parse(localStorage.getItem('score')) || [];
var quizTime = 75;
var userInitials = "";
var questionNumber = 0;

//
function showQuestion(number) {
    questionsWrapper.classList.remove('hide');
    if(number < questions.length) {
        questionTitle.textContent = questions[number].questionTitle;
        for(var answer in questions[number].answers) {
            choices.insertAdjacentHTML('beforeend',`<button>${Number(answer) + 1}. ${questions[number].answers[answer]}</button>`);
        }  
    }
}

// btn.addEventListener('click', function() {

//     startScreen.classList.add('hide');
//     questionsWrapper.classList.remove('hide');
//     showQuestion(questionNumber);
//     questionsWrapper.addEventListener('click', function(event) {
//         if(event.target.nodeName.includes('LI')) {
//             if(event.target.textContent === questions[questionNumber].correctAnswer) {
//                 questionsWrapper.insertAdjacentHTML('afterend',
//                 '<div class="user-answer">Correct !</div>');
//                 questionNumber++;
//             } else {
//                 questionsWrapper.insertAdjacentHTML('afterend',
//                 '<div class="user-answer">Wrong !</div>');
//                 questionNumber++;
//             }
//         }
//     })
// });

function startQuiz(event) {
    // start timer
    timeElement.textContent = quizTime;
    var countDown = setInterval(function() {
        quizTime--;
        timeElement.textContent = quizTime;
        if(quizTime <= 0) {
            clearInterval(countDown);
            startScreen.classList.add('hide');
            endScreen.classList.remove('hide');
            finalScore.textContent = quizTime;
            submitBtn.addEventListener('click',function() {
                userInitials += userInitialsInput.value;
                userScores = [...userScores,{initials: userInitials,score: quizTime}];
                localStorage.setItem('score',JSON.stringify(userScores));
                // window.location = window.location.pathname.slice(0, -10) + "highscores.html";
                window.location.href = "highscores.html"
            });             
        }
    }, 1000);
    startScreen.classList.add('hide');
    showQuestion(questionNumber);
    questionsWrapper.addEventListener('click',function(event) {
        // check user answer
        if(event.target.nodeName.includes('BUTTON')) {
            questionNumber++;
            console.log(event.target.textContent.slice(3))
            if(event.target.textContent.slice(3) === questions[questionNumber-1].correctAnswer) {
                console.log('correct')
            } else {
                console.log('wrong');
                quizTime -= 15;
            }
        }
        // if user answer all the questions
        if(questionNumber === 5) {
            questionsWrapper.classList.add('hide');
            console.log(quizTime);
            endScreen.classList.remove('hide');
            finalScore.textContent = quizTime;
            submitBtn.addEventListener('click',function() {
                userInitials += userInitialsInput.value;
                userScores = [...userScores,{initials: userInitials,score: quizTime}];
                localStorage.setItem('score',JSON.stringify(userScores));
                console.log(window.location.pathname.slice(0, -10) + "highscores.html");
                window.location = window.location.pathname.slice(0, -10) + "highscores.html";
            });   
            clearInterval(countDown);
        } else {
            questionsWrapper.classList.add('hide');
            choices.textContent = "";
            showQuestion(questionNumber);
        }
    })
}
// when button is clicked start quiz
btn.addEventListener('click', startQuiz);


