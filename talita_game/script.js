let currentAnswer;
let currentQuestion;
let score = 0;
let level = 1;
let timeLeft = 10;
let timer;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
    const num1 = getRandomInt(1, 10 * level);
    const num2 = getRandomInt(1, 10 * level);
    const operation = Math.random() < 0.5 ? 'add' : 'subtract';

    if (operation === 'add') {
        currentAnswer = num1 + num2;
        currentQuestion = `Berapa ${num1} + ${num2}?`;
    } else {
        currentAnswer = num1 - num2;
        currentQuestion = `Berapa ${num1} - ${num2}?`;
    }

    document.getElementById("question").innerText = currentQuestion;
    document.getElementById("result").innerText = '';
    document.getElementById("next").style.display = 'none';
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("timer").innerText = `Waktu: ${timeLeft} detik`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Waktu: ${timeLeft} detik`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("result").innerText = `Waktu habis! Jawaban yang benar adalah ${currentAnswer}.`;
            document.getElementById("next").style.display = 'inline';
        }
    }, 1000);
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("answer").value);
    const resultElement = document.getElementById("result");

    if (userAnswer === currentAnswer) {
        score++;
        resultElement.innerText = "Benar!";
        resultElement.className = 'correct';
        document.getElementById("score").innerText = `Skor: ${score}`;
        if (score % 5 === 0) {
            level++;
            document.getElementById("level").innerText = `Level: ${level}`;
        }
    } else {
        resultElement.innerText = `Salah! Jawaban yang benar adalah ${currentAnswer}.`;
        resultElement.className = 'incorrect';
    }

    clearInterval(timer);
    document.getElementById("next").style.display = 'inline';
}

// Event listeners
document.getElementById("submit").addEventListener("click", checkAnswer);
document.getElementById("next").addEventListener("click", function() {
    document.getElementById("answer").value = '';
    generateQuestion();
});

// Generate soal pertama saat halaman dimuat
window.onload = generateQuestion;
