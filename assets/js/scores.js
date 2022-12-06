var highscores = document.querySelector('#highscores');
var userScores = JSON.parse(localStorage.getItem('score')) || [];
var clearBtn = document.querySelector('#clear');

// sort user scores
// To Do

userScores.sort((a,b) => a.score - b.score);

// Display user score
for(var userScore in userScores) {
    highscores.insertAdjacentHTML('afterbegin',`<li>${userScores[userScore].initials} - ${userScores[userScore].score}</li>`);
}

// clear data in local Storage
clearBtn.addEventListener('click', function() {
    localStorage.removeItem('score');
    highscores.textContent = "";
})

