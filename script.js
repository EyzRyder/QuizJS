// initial data
let currentQuestion = 0;
let correctAnswer = 0;

showQuestion();

//evens
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//functions
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = "none";
        document.querySelector('.questionArea').style.display = "block";

        document.querySelector('.question').innerHTML = q.question;
        
        let optionsHtml = '';
        for (let i in q.options) { 
            //document.querySelector('.options').innerHTML
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswer++;
    } else {
        console.log('erro');
    } 
    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswer / questions.length) * 100);

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = `Levou I, Ta feio o negocio`;
        document.querySelector('.scorePct').style.color = '#ff0000';
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = `R passa vai`;
        document.querySelector('.scorePct').style.color = '#ffff00';
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = `Parabens pelo MB, ta virando alguem da vida ein`;
        document.querySelector('.scorePct').style.color = '#0d630d';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Voce respondeu ${questions.length} questoes e acertou ${correctAnswer}.`;

    document.querySelector('.scoreArea').style.display = "block";
    document.querySelector('.questionArea').style.display = "none";
    document.querySelector('.progress--bar').style.width = `100%`;
}
function resetEvent() {
    currentQuestion = 0;
    correctAnswer = 0;

    showQuestion();
}