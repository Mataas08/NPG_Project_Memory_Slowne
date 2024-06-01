function showScoreBoard() {
    var x = [0, 0, 0, 0, 0, 0, 0];
    var y = [0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < attempt; i++) {
        x[6 - i] = attempt - i - 1;
    }

    var data = wyniki.join(" ").trim();
    var values = data.split(' ').map(Number);
    var y = values.slice(-7);

    var chLine = document.getElementById("chLine");
    var chartData = {
        labels: [x[0], x[1], x[2], x[3], x[4], x[5], x[6]],
        datasets: [{
            data: [y[0], y[1], y[2], y[3], y[4], y[5], y[6]],
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
        }]
    };

    if (chLine) {
        new Chart(chLine, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'numer próby'
                        },
                        ticks: {
                            beginAtZero: false
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'wynik'
                        }
                    }]
                },
                legend: {
                    display: false
                },
                responsive: true
            }
        });
    }

    document.getElementById("showResultLabel").innerText = round - 1;
}