function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function changeVisibilityOfDisplay(name) {
	var displays = ["start", "showText", "enterText", "roundWon", "score"];
	for (let i = 0; i < 5; i++) {
		var x = document.getElementById(displays[i]);	
        x.style.display = "none";
    }
     
    var x = document.getElementById(name);
    x.style.display = "block";
}

function countingDown(time, count, label){
	document.getElementById(label).value = count;
	for (let i = 1; i <= count; i++) {
    	sleep(i * time).then(() => {
        	document.getElementById(label).value = count - i;
    	});
	}
}

function loadPage() {
    changeVisibilityOfDisplay("start");
}