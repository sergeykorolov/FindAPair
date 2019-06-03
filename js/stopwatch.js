//реализация таймера
function Stopwatch(opts) {

    var time = 0;
    var interval;
    var offset;
    var elem = opts.elem;
    var delay = opts.delay;

    // обновление строки времени
    function update() {
        if(this.isOn){
            time += delta();
        }
        var formattedTime = timeFormatter(time); // записываем читаемую строку
        elem.textContent = formattedTime;
    }

    // получаем смещение для дальнейшего вычисления времени
    // сначала в timePassed запишется 0
    function delta() {
        var now = Date.now();
        var timePassed = now - offset;
        offset = now;
        return timePassed;
    }

    // метод получает миллисекунды и возвращает читаемую строку времени
    function timeFormatter(timeInMilliseconds) {
        var time = new Date(timeInMilliseconds);    // создаем объект Date с полученным временем
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var milliseconds = time.getMilliseconds().toString();

        // если в числе меньше двух цифр, то впереди ставиться 0
        if(minutes.length < 2){
            minutes = "0" + minutes;
        }
        if(seconds.length < 2){
            seconds = "0" + seconds;
        }

        // если в числе меньше трех цифр, то впереди ставиться 0
        while (milliseconds.length < 3){
            milliseconds = "0" + milliseconds;
        }
        return minutes + ":" + seconds + "." + milliseconds;
    }

    this.isOn = false;

    // вызывается при запуске таймера. Повторяет выполнение метода update() с заданным интервалом (delay),
    this.start = function (){
        if(!this.isOn){
            interval = setInterval(update.bind(this), delay);
            offset = Date.now();
            this.isOn = true;
        }
    };

    // останавливает таймер обнулив интервал
    this.stop = function (){
        if(this.isOn){
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    };

    // сброс таймера
    this.reset = function (){
        if(!this.isOn){
            time = 0;
            update();
        }
    };
}

