var colors = ["red", "blue", "gray", "yellow", "violet", "green", "orange", "lime"]; //массив с 8 цветами для каждой пары
var count = colorNumber = 0; //счетчик ходов и счетчик цвета для каждой пары
var closingCellIndex; //индекс закрывающей клетки

var seconds = 0; // переменные для таймера
var secondsFormatted;


$("button").click(function() {

    //создали таймер, который начинает отсчет секунд после запуска игры кнопкой "Играть"
    var timer = setInterval(function() {
        secondsFormatted = (Math.floor(seconds/3600) + " : " + (Math.floor(seconds/60) - (Math.floor(seconds/3600) * 60)) + " : " + seconds % 60);
        $("#timer").text(secondsFormatted);
        seconds++;
    }, 1000);

    //генерируем последовательность 16 случайных чисел от 1 до 16 и записываем ее в массив randomSequence
    var i, arr = [], randomSequence = [];
    for (i = 1; i <= 16; i++ ) arr.push(i);
    for (i = 0; i < 16; i++) randomSequence.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0])
    console.log(randomSequence);

        $("td").click(function() {//по клику на ячейку определяем открывающий/закрывающий/ошибочный ход
            cellNumber = Number($(this).text());//запоминаем номер открытой ячейки
            count++;
            console.log(randomSequence.indexOf(cellNumber));

            if (count % 2 !== 0) {//открывающий ход
                $(this).css("background", colors[colorNumber]);
                $(this).css("color", colors[colorNumber]);
                console.log("Opening move: " + count);
                lastOpeningMove = Number($(this).text());
            }
            
            // определяем номер ячейки, которая должна быть закрывающей для выбранной открывающей ячейки
            if (randomSequence.indexOf(lastOpeningMove) % 2 === 0) closingCellIndex = randomSequence.indexOf(lastOpeningMove) + 1;
            else closingCellIndex = randomSequence.indexOf(lastOpeningMove) - 1;

            if (count % 2 === 0 && cellNumber === randomSequence[closingCellIndex]) {//закрывающий ход
                $(this).css("background", colors[colorNumber]);
                $(this).css("color", colors[colorNumber]);
                console.log("Closing move: " + count);
                colorNumber++;
                console.log("Color index" + colorNumber);
            }

            if (count % 2 === 0 && cellNumber !== randomSequence[closingCellIndex]) {//ошибочный ход
                var cellOnClick = document.getElementById(lastOpeningMove);
                cellOnClick.style.background = 'white';
                cellOnClick.style.color = 'white';
                console.log("False move");
                count = 0;
                console.log("Color index " + colorNumber);
            }

            console.log("End of program");

            if (colorNumber === 8){//вывод всплывающего окна о завершении игры с перезагрузкой
                alert("Вы выиграли!" + '\r\n' + "Затраченное время " + secondsFormatted);
                var reloadTime = 3;
                alert(`Страница автоматически перезагрузится через ${reloadTime} секунды.`);
                setTimeout("window.location.reload()", reloadTime * 1000);
              }
        });
});