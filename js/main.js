var timer = document.getElementById("timer");
var startBtn = document.getElementsByClassName("start")[0];
var resultTime = document.getElementsByClassName("resultTime")[0];
var message = document.getElementsByClassName("message")[0];
var playField = document.getElementsByClassName("playField")[0];

var watch = new Stopwatch({
    elem: timer,
    delay: 10
});

// вызывается функция для генерации цветов для клеток игрового поля и запускается таймер
function startGame() {
    colorGenerator();
    watch.start();
    startBtn.textContent = "Stop"; // изменяется текст кнопки
    playField.className = playField.className.replace(/ cursorDefault/g, "");
    playField.className =  playField.className + " cursorPointer";
}

// остановка игры
function stopGame() {
    watch.stop();                                   // остановка таймера
    startBtn.textContent = "Start";
    document.getElementsByClassName("start")[0].style.display = "none";  // кнопка старт и таймер спрятаны
    document.getElementById("timer").style.display = "none";             // пока на экране всплывающее окно
    resultTime.innerHTML = timer.innerText;                              // сохраняем результат времени
    // если количество найденых пар меньше 8, то выводится сообщение о проигрыше.
    if (foundedPairs < 8) {
        message.innerText = "Вы проиграли!";
        foundedPairs = 0;
    } else {
        message.innerText = "Вы выиграли!";
        foundedPairs = 0;
    }

    // отключаем свойства для курсора и выводим всплывающее окно с результатом игры
    playField.className = playField.className.replace(/ cursorPointer/g, "");
    playField.className = playField.className + " cursorDefault";
    document.getElementsByClassName("popup")[0].style.display = "block";
}

// вызывается функция stopGame или startGame в зависимсти от состояния переменной isOn
startBtn.addEventListener("click", function () {
    (watch.isOn) ? stopGame() : startGame();
});

// при нажатии на кнопку ОК на всплывающем окне, очищаем игровое поле от цветов и обнуляем таймер.
function buttonOk() {
    document.getElementsByClassName("popup")[0].style.display = "none";
    clearGameField();
    document.getElementsByClassName("start")[0].style.display = "block";
    document.getElementById("timer").style.display = "block";
    watch.reset();
    firstColor = "";
    secondColor = "";
    pairCounter = 0;
}