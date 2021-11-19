const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionsCounter = 0;
let availableQuestions = [];
let question = [
  {
    question: "what is DOM in Javascript?",
    choices: [
      "Document object Model",
      "Documet Objects",
      "Document Model Object",
      "Object of Model",
    ],
    answer: "Document object Model",
  },
  {
    question: "The condition in an if/else statement is enclosed with _____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "All of the following are different kinds of loops, EXCEPT:",
    choices: ["for/of", "for", "for/in", "for/out"],
    answer: "for/out",
  },
  {
    question:
      "JavaScript is one of 3 languages all web developers must learn. The other two are:",
    choices: ["python and html", "html and css", "ruby and css", "SQL and C++"],
    answer: "html and css",
  },
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["string", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question: "If you add a number and a string, the result will be ________.",
    choices: ["undefined", "a string concatenation", "an error", "a boolean"],
    answer: "a string concatenation",
  },
  {
    question: "If you have a true or false, the result will be ________.",
    choices: ["undefined", "a string concatenation", "an error", "a boolean"],
    answer: "a boolean",
  },
  {
    question: "If you have a name, the result will be ________.",
    choices: ["undefined", "a string ", "an error", "a boolean"],
    answer: "a string",
  },
  {
    question: "If you have an error, the result will be ________.",
    choices: ["undefined", "a string ", "an error", "a boolean"],
    answer: "an error",
  },
  {
    question: "besides if and else what else can you use?.",
    choices: ["undefined", "switch and case ", "an error", "a boolean"],
    answer: "switch and case ",
  },
];
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;
startGame = () => {
  questionCounter = 0;
  score = 1;
  availableQuestions = [...questions];
  getNewQuestion();
};
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }
  questionsCounter++;
  progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionsCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedchoice = e.target;
    const selecredAnswer = selectedchoice.dataset["number"];

    let classToApply =
      selecredAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }
    selectedchoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedchoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
incrementScore = (num) => {
  score += num;
  scoreText.innerText;
};
startGame();
