function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function changeVisibilityOfDisplay(name) {
    var displays = ["start", "showText", "enterText", "roundWon", "score", "chLine", "rules"];
    for (let i = 0; i < displays.length; i++) {
        var x = document.getElementById(displays[i]);
        x.style.display = "none";
    }

    var x = document.getElementById(name);
    x.style.display = "block";
}

function changeVisibilityOfChart(){
	var chLine = document.getElementById("chLine");
    if (chLine.style.display === "none") {
        chLine.style.display = "block";
    } else {
        chLine.style.display = "none";
    }
}

function countingDown(time, count, label){
	document.getElementById(label).innerText = count/2;
	for (let i = 1; i <= count; i++) {
    	sleep(i * time).then(() => {
        	document.getElementById(label).innerText = (count - i) / 2;
    	});
	}
}

function loadPage() {
    backToLobby();
}

// funkcje odpowiedzialne za przycisk zasady gry:

function showRules() {
    changeVisibilityOfDisplay("rules");
}

function hideRules() {
    var iframe = document.getElementById("instructionVideo");
    if (iframe) {
        var src = iframe.src;
        iframe.src = src; // Reset the src attribute to stop the video
    }
    changeVisibilityOfDisplay("start");
}

