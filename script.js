const windows = document.querySelectorAll('.window');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('start-btn');
const hitAudio = document.getElementById('hit-audio');
let score = 0;
let time = 20;
let ralphIndex = null;
let interval = null;
let timer = null;
let gameActive = false;

function randomWindow() {
​ ​ windows.forEach(win => win.classList.remove('ralph'));
​ ​ ralphIndex = Math.floor(Math.random() * windows.length);
​ ​ windows[ralphIndex].classList.add('ralph');
}

function startGame() {
​ ​ score = 0;
​ ​ time = 20;
​ ​ scoreEl.textContent = score;
​ ​ timeEl.textContent = time;
​ ​ gameActive = true;
​ ​ startBtn.disabled = true;
​ ​ randomWindow();
​ ​ interval = setInterval(randomWindow, 900);
​ ​ timer = setInterval(() => {
​ ​ ​ ​ time--;
​ ​ ​ ​ timeEl.textContent = time;
​ ​ ​ ​ if (time === 0) endGame();
​ ​ }, 1000);
}

function endGame() {
​ ​ clearInterval(interval);
​ ​ clearInterval(timer);
​ ​ windows.forEach(win => win.classList.remove('ralph'));
​ ​ gameActive = false;
​ ​ startBtn.disabled = false;
​ ​ alert(`Fim de jogo! Você fez ${score} pontos.`);
}

windows.forEach((win, idx) => {
​ ​ win.addEventListener('click', () => {
​ ​ ​ ​ if (!gameActive) return;
​ ​ ​ ​ if (idx === ralphIndex) {
​ ​ ​ ​ ​ ​ score++;
​ ​ ​ ​ ​ ​ scoreEl.textContent = score;
​ ​ ​ ​ ​ ​ hitAudio.currentTime = 0;
​ ​ ​ ​ ​ ​ hitAudio.play();
​ ​ ​ ​ ​ ​ win.classList.remove('ralph');
​ ​ ​ ​ } else {
​ ​ ​ ​ ​ ​ // Som opcional para erro
​ ​ ​ ​ ​ ​ // missAudio.currentTime = 0;
​ ​ ​ ​ ​ ​ // missAudio.play();
​ ​ ​ ​ ​ ​ score--;
​ ​ ​ ​ ​ ​ scoreEl.textContent = score;
​ ​ ​ ​ }
​ ​ });
});

startBtn.addEventListener('click', startGame);
