var colors = ["red", "green", "yellow", "blue", "gray", "brown", "black", "pink"]; // массив из которого генерируются цвета клеток

var firstCell;          // первая выбранная клетка
var secondCell;         // вторая выбранная клетка
var firstColor = "";    // цвет первой выбранной клетки
var secondColor = "";   // цвет второй выбранной клетки
var pairCounter = 0;    // счетчик открываемых для сравнения клеток
var foundedPairs = 0;   // счетчик наденных пар

var cellArray = document.getElementsByClassName("cell"); // получаем массив с клетками игрового поля

// генерируем 8 пар цветов для игрового поля
function colorGenerator() {
    for (var i = 0; i < cellArray.length;) {
        var colorIndex = Math.floor(Math.random() * 8); // получаем случайное число от 0 до 7
        var color = colors[colorIndex];                 // получаем по индексу название цвета из массива colors
        var colorCount = 0;                             // счетчик повторяющихся цветов
        for (var j = 0; j < cellArray.length; j++) {
            if (cellArray[j].className.indexOf(color) !== -1) {  // проверяем сколько клеток уже содержат выбраный цвет
                colorCount++;
            }
        }
        // каждой клетке по очереди присваивается класс с названием цвета, который определен в CSS
        if (colorCount < 2) {
            cellArray[i].className = cellArray[i].className + " " + color;
            i++;
        }
    }
}

// очищаем ячейки игрового поля от цветов
function clearGameField() {
    for (var i = 0; i < cellArray.length; i++) {
        cellArray[i].className = "cell hide";
    }
}

// Обработка клика по клетке
function clickOnCell(event) {
    // если таймер включен, то клики по ячейкам обрабатываются
    if (watch.isOn) {
        // при клике по уже закрашенной клетке функция завершает выполнение
        if (event.target.className.indexOf("hide") === -1) {
            return;
        }
        // у клетки удаляется класс hide, который отвечает за скрытие цвета
        event.target.className = event.target.className.replace(/ hide/g, "");
        pairCounter++;

        // извлекается название цвета из двух выбраных ячеек
        if (pairCounter === 1) {
            firstCell = event.target;
            firstColor = event.target.className.replace(/cell /g, "");
        }
        if (pairCounter === 2) {
            secondCell = event.target;
            secondColor = event.target.className.replace(/cell /g, "");
        }
        // при не совпадении цветов добавляем паузу,
        // чтобы ненадолго был заметен цвет неверно выбраной клетки перед скрытием
        if (pairCounter === 2 && firstColor !== secondColor) {
            setTimeout(function () {
                // присваиваем несовпавшим клеткам класс hide для скрытия цвета
                firstCell.className = "cell hide " + firstColor;
                secondCell.className = "cell hide " + secondColor;
                firstColor = "";
                secondColor = "";
                pairCounter = 0;
            }, 150);
            // если цвета совпали, то увеличиваем счетчик найденых пар
        } else if (pairCounter === 2 && firstColor === secondColor) {
            foundedPairs++;
            firstColor = "";
            secondColor = "";
            pairCounter = 0;
        }

        // если все пары нашлись, то вызывается функция stopGame()
        if (foundedPairs === 8) {
            stopGame();
        }
    }
}
