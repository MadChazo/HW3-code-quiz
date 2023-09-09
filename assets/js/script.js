// Document element variables
var questions = document.getElementsByClassName("question");
var introScreen = document.getElementsByClassName("intro")[0];
var timeSpan = document.getElementById("time");
var startBtn = document.getElementById("start");
var lastAnswer = document.getElementById("last-answer");
var endScreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var hsScreen = document.getElementById("highscore-screen");
var submitBtn = document.getElementById("submit");
var clearBtn = document.getElementById("clear");
var homeBtn = document.getElementById("home");
var hsList = document.getElementById("highscores");
var viewHS = document.getElementsByTagName("h2")[0];
// Value tracker variables
var currentQ = 0;
var score = 0;
var timeLeft = 60;

function writeTime() {
  timeSpan.textContent = timeLeft;
}

//
function timer() {
  var timer = setInterval(function () {
    timeLeft--;
    writeTime();
    viewHS.addEventListener("click", function () {
      clearInterval(timer);
    });
    if (timeLeft == 0) {
      clearInterval(timer);
      endQuiz();
    }
    if (currentQ == questions.length - 1) {
      clearInterval(timer);
    }
  }, 1000);
}

// Should reset quiz to default, but sometimes score is kept, and only lets you answer one question before ending quiz
function resetQuiz() {
  hsScreen.setAttribute("style", "display: none");
  score = 0;
  currentQ = 0;
  timeLeft = 60;
  writeTime();
  introScreen.setAttribute("style", "display: block");
}

function highscore() {
  var inits = document.getElementById("initials").value;
  var newScore = document.createElement("li");
  //   if (localStorage.getItem("scoreList") != null) {
  //     hsList = JSON.parse(localStorage.getItem("scoreList"));
  //   }
  newScore.textContent = inits + " - " + score;
  hsList.appendChild(newScore);
  //   localStorage.setItem("scoreList", JSON.stringify(hsList));
  endScreen.setAttribute("style", "display: none");
  lastAnswer.setAttribute("style", "display: none");
  hsScreen.setAttribute("style", "display: block");
}

function endQuiz() {
  questions[currentQ].setAttribute("style", "display: none");
  endScreen.setAttribute("style", "display: block");
  finalScore.textContent = score;
  submitBtn.addEventListener("click", highscore);
}

function nextQ(ans) {
  if (currentQ == questions.length - 1) {
    if (ans.classList.contains("correct")) {
      lastAnswer.setAttribute("style", "display: block");
      score++;
      lastAnswer.textContent = "Correct";
    } else {
      lastAnswer.textContent = "Incorrect";
    }
    endQuiz();
  } else if (ans.classList.contains("correct")) {
    lastAnswer.setAttribute("style", "display: block");
    score++;
    lastAnswer.textContent = "Correct";
    questions[currentQ].setAttribute("style", "display: none");
    currentQ++;
    setupQ(currentQ);
  } else {
    lastAnswer.textContent = "Incorrect";
    timeLeft -= 5;
    writeTime();
    questions[currentQ].setAttribute("style", "display: none");
    currentQ++;
    setupQ(currentQ);
  }
}

function setupQ(q) {
  var answers = questions[q].getElementsByTagName("li");
  questions[q].setAttribute("style", "display: block");
  // Is this a bad idea?
  for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", function () {
      nextQ(answers[i]);
    });
  }
}

function startQuiz() {
  timer();
  introScreen.setAttribute("style", "display: none");
  questions[0].setAttribute("style", "display: block");
  setupQ(0);
}

writeTime();
startBtn.addEventListener("click", startQuiz);
viewHS.addEventListener("click", function () {
  questions[currentQ].setAttribute("style", "display: none");
  introScreen.setAttribute("style", "display: none");
  endScreen.setAttribute("style", "display: none");
  hsScreen.setAttribute("style", "display: block");
});
homeBtn.addEventListener("click", resetQuiz);
