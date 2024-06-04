var wyniki = [0,0,0,0,0,0,0];
var attempt = 0;

var textRem;
var round = 0;
var words = [];

document.addEventListener("DOMContentLoaded", function() {
    var answerInput = document.getElementById("answer");

    loadGameProgress(); // cookie - Wczytuje postępy gry przy ładowaniu strony	

    answerInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            submitAnswer();
        }
    });
});

function saveGameProgress() { // cookie - Funkcja do zapisywania postępów gry w Local Storage
    const gameProgress = {
        wyniki: wyniki,
        attempt: attempt,
        round: round,
        words: words
    };
    const gameProgressJSON = JSON.stringify(gameProgress);
    localStorage.setItem('gameProgress', gameProgressJSON); // cookie - Zapis do Local Storage
    console.log('Postępy gry zapisane!'); // Log
    console.log('Zapisane dane:', gameProgress); // Log
}

function loadGameProgress() { // cookie - Funkcja do wczytywania postępów gry z Local Storage
    const savedProgress = localStorage.getItem('gameProgress'); // cookie - Odczyt z Local Storage
    if (savedProgress) {
        const gameProgress = JSON.parse(savedProgress);
        wyniki = gameProgress.wyniki;
        attempt = gameProgress.attempt;
        round = gameProgress.round;
        words = gameProgress.words;
        console.log('Postępy gry załadowane!', gameProgress);
    } else {
        console.log('Brak zapisanych postępów gry.'); 
    }
}

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
    saveGameProgress(); // cookie - Zapis postępów gry po każdej próbie
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
		document.getElementById("answer").placeholder = "Podaj odpowiedź";
            changeVisibilityOfDisplay("enterText");
		document.getElementById("answer").focus();
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
	    saveGameProgress(); // cookie - Zapis postępów gry po każdej próbie
    }
}
