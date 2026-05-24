let xmlDoc;
let questions;

let currentQuestion = 0;

let score = 0;

let timer = 0;

let interval;

function startQuiz(file){

    document.getElementById("start-screen")
    .style.display = "none";

    document.getElementById("quiz-screen")
    .style.display = "block";

    currentQuestion = 0;

    score = 0;

    timer = 0;

    document.getElementById("score").innerHTML =
    score;

    interval = setInterval(() => {

        timer++;

        document.getElementById("timer").innerHTML =
        timer;

    },1000);

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function(){

        xmlDoc = this.responseXML;

        questions =
        xmlDoc.getElementsByTagName("question");

        showQuestion();
    }

    xhttp.open("GET", file);

    xhttp.send();
}

function showQuestion(){

    if(currentQuestion >= questions.length){

        clearInterval(interval);

        document.getElementById("quiz-screen")
        .innerHTML =
        `
        <h2>Quiz Finished!</h2>

        <p>Final Score:
        ${score}/${questions.length}</p>

        <p>Total Time:
        ${timer} seconds</p>
        `;

        return;
    }

    let q = questions[currentQuestion];

    let wording =
    q.getElementsByTagName("wording")[0]
    .textContent;

    let image =
    q.getElementsByTagName("image")[0]
    .textContent;

    document.getElementById("question")
    .innerHTML = wording;

    document.getElementById("question-image")
    .src = image;

    let choices =
    q.getElementsByTagName("choice");

    let answersHTML = "";

    for(let i=0; i<choices.length; i++){

        let text = choices[i].textContent;

        let correct =
        choices[i].getAttribute("correct");

        answersHTML +=
        `
        <button
        onclick="checkAnswer(this,'${correct}')">

        ${text}

        </button>
        `;
    }

    document.getElementById("answers")
    .innerHTML = answersHTML;
}

function checkAnswer(button, correct){

    let buttons =
    document.querySelectorAll("#answers button");

    buttons.forEach(btn => btn.disabled = true);

    if(correct === "yes"){

        button.style.background = "green";

        score++;

        document.getElementById("score")
        .innerHTML = score;

    }else{

        button.style.background = "red";
    }
}

document.getElementById("nextBtn")
.addEventListener("click", () => {

    currentQuestion++;

    showQuestion();
});
