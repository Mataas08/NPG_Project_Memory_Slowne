var wyniki = [0,0,0,0,0,0,0];
var attempt = 0;

var textRem;
var round = 0;
var words = [];

document.addEventListener("DOMContentLoaded", function() {
    var answerInput = document.getElementById("answer");

    answerInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            submitAnswer();
        }
    });
});

function startGame(){
    var easyMode = document.getElementById("easyModeSelect").checked;
    var midMode = document.getElementById("midModeSelect").checked;
    var highMode = document.getElementById("highModeSelect").checked;

    if(easyMode) {
        words = [...short_words];
    } else if(midMode) {
        words = [...mid_words];
    } else if(highMode) {
        words = [...long_words];
    }
    game();
}

function backToLobby() {
    changeVisibilityOfDisplay("start");
    round = 0;
    textRem = "";
    attempt++;
    showScoreBoard();
}

function game() {
	document.getElementById("answer").value = "";

    round = round + 1;

    if (round > words.length) {
        backToLobby();
        alert("XDD");
    } else {
        var actualText = [];
        var wordsInRound = [];

        for (let i = 0; i < round; i++) {
            var textToAdd;

            do {
                textToAdd = words[getRandomInt(words.length)].trim();
            } while (wordsInRound.includes(textToAdd));

            wordsInRound.push(textToAdd);
            actualText.push(textToAdd);
        }

        textRem = actualText.join(" ");

        changeVisibilityOfDisplay("showText");
        document.getElementById("showTextLabel").innerText = textRem;

        countingDown(500, 6, "showTimeLabel");

        sleep(3500).then(() => {
            document.getElementById("showTimeLabel").innerText = "0";
		document.getElementById("answer").innerText = "Podaj";
            changeVisibilityOfDisplay("enterText");
        });
    }
}

function submitAnswer() {
    var x = document.getElementById("answer").value;
    if (x == textRem) {
        changeVisibilityOfDisplay("roundWon");

        countingDown(500, 4, "roundWonLabel");

        sleep(2500).then(() => {
            changeVisibilityOfDisplay("enterText");
            game();
        });

    } else {
        changeVisibilityOfDisplay("score");
        document.getElementById("showResultLabel").innerText = round - 1;
        wyniki.push((round - 1).toString());

        showScoreBoard();
    }
}
