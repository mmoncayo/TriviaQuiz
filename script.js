// declaring all the variables and establishing querySelectors that will be used in the quiz program
var position= 0; // initializing the position in the question order of the quiz
var correct= 0; // initializing the count of the amount of questions answered correctly
var score= 0; // initializing the score you receive
var start= get("start"); // the first page seen when the program is opened
var test= get("test"); // where the body of the question and the choices will be 
var answer= get("answer"); // where the answers will be submitted and checked
var test_status= get("test_status"); // the main header of the question
var timer= get("timer"); // the countdown timer on the upper right hand corner
var question, choice, choices , chA, chB, chC, chD; // variables for the questions and choices
var correctAudio= get("correctAnswer"); // defines correct answer sound when user answers question correctly
var wrongAudio= get("wrongAnswer"); // defines incorrect answer sound when user answer question incorrectly
var highScores= get("highScores"); // defines high-scores button to display a new page for high scores
var form= get("form"); // to input high scores
var initials= get("initials"); // takes in initials for high score table

// questions will be in arrays as objects, with each index representing (in order) the question, multiple choice options, and the correct answer
var questions = [
  // example:
  //["question", "choice a", "choice b", "choice c", "choice d", "correct answer"]
  ["Which is the hottest planet?", "Mercury", "Saturn", "Jupiter", "Venus", "D"],
  ["What are the tallest trees on Earth?", "Coast Douglas", "Fir", "Coast Redwood", "Sitka Spruce", "C"],
  ["What was the name of Robert De Niro's character in Taxi Driver?", "Jimmy Bickle", "Virgil Bickle", "Travis Bickle", "Harry Bickle", "C"],
  ["Which war caused the greatest loss of life for Americans?", "The American Civil War", "Vietnam War", "World War 2", "World War 1", "A"],
  ["What's the world's most venomous fish?", "Scorpion fish", "Stonefish", "Toadfish", "Lion Fish", "B"],
  [" In darts, what's the most points you can score with a single throw?", "20", "100", "50", "60", "D"]
];

// to avoid repeatedly typing out 'document.getElementById()'
function get(x){
  return document.getElementById(x);
};

// the quiz commences once the user clicks the start button when the page loads for the first time
function startQuiz(){
  start.style.display= "none";
  setTime();
  renderQuestion();
  test_status= get("test_status");
  test= get("test");
  answer= get("answer");
  test_status.style.display="block";
  test.style.display= "block";
  answer.style.display= "block";
}

// gets a timer started when use clicks start to begin the quiz
var secondsLeft = 72; // however many seconds the timer will start with before it counts down

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Time Remaining: " + secondsLeft;

    if(secondsLeft === 0 || secondsLeft < 0) {
      secondsLeft= '';
      clearInterval(timerInterval);
      timer.style.display= "none";
      sendMessage();
    }
    if(position>=questions.length){
      secondsLeft= '';
      clearInterval(timerInterval);
      timer.style.display= "none";

    }
  }, 1000);
}

// sends a message if the timer is done and user is not finished with the quiz
function sendMessage(){
  secondsLeft= '';
  get("test_status").innerHTML= "Time's Up!";
  test= get("test");
  test.innerHTML= "<h2>You got " + correct + " out of " + questions.length + " questions correct.</h2><br>Your final score is " + score + "<br>";
  form.style.display= "block";
}

// provides the questions
function renderQuestion(){
  
  test = get("test");
  // if the user completes the quiz, prompt with what the final results and scores are
  if(position >= questions.length){
    test.innerHTML= "<h2>You got " + correct + " out of " + questions.length + " questions correct.</h2><br>Your final score is " + score + "<br>";
    get("test_status").innerHTML= "Quiz Completed";
    form.style.display= "block";

    // stops rest of renderQuestions function running when test is completed
    return false;
  }

  get("test_status").innerHTML= "Question " + (position + 1) + " of " + questions.length;
  question = questions[position][0];
  chA= questions[position][1];
  chB= questions[position][2];
  chC= questions[position][3];
  chD= questions[position][4];
  test.innerHTML= "<h3>" + question + "</h3>";
  
  // the += appends to the data we started on the line above
  test.innerHTML += "<input type= 'radio' name= 'choices' value= 'A'>" + chA + "<br>";
  test.innerHTML += "<input type= 'radio' name= 'choices' value= 'B'>" + chB + "<br>";
  test.innerHTML += "<input type= 'radio' name= 'choices' value= 'C'>" + chC + "<br>";
  test.innerHTML += "<input type= 'radio' name= 'choices' value= 'D'>" + chD + "<br><br>";
  test.innerHTML += "<button id= 'answer' onclick='checkAnswer()'>Submit Answer</button><br>";
  
}

function checkAnswer(){
  // use getElementsByName because we have an array which it will loop through
  choices= document.getElementsByName("choices");
  for(var i= 0; i<choices.length; i++){
    if(choices[i].checked){
      choice = choices[i].value;
    }
  }

  // checks if answer matches the correct choice
  if(choice == questions[position][5]){
    // each time there is a correct answer: alert user, add count to correct answers, and add score to final score
    correct++;
    score+= 3;
    $("div").append("<p><h2><em>Correct!</p></h2></em>")
    correctAnswer();
  }
  else{
    //deducts 10 seconds from the timer for every wrong answer to a question
    secondsLeft-= 10;
    $("div").append("<p><h3><em>Wrong!</p></h3></em>")
    wrongAnswer();
  }

  // changes position of which character user is on
  position++;
  // then the renderQuestion function runs again to go to the next question
  renderQuestion();
}

// audio for when user answers question correctly
function correctAnswer() {
  correctAudio.play();
}

// audio for when user answers question incorrectly
function wrongAnswer(){
  wrongAudio.play();
}


$("#highScores").click(function(){
  href = "high-scores.html";
});

start.addEventListener("click", startQuiz);
highScores.addEventListener("click", renderHighScores);

