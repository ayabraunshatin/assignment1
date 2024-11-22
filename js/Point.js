let point;
let points = [];
let lineChart;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        return `(${this.x}, ${this.y})`;
    }

    equals(secondPoint) {
        return this.x === secondPoint.x && this.y === secondPoint.y;
    }
}

function sortPointsByCoordinates(points) {
    return points.sort((p1, p2) => {
        if (p1.x === p2.x) {
            return p1.y - p2.y;
        }
        return p1.x - p2.x;
    });
}

function addPoint() {
    const x = parseFloat(document.getElementById('x').value);
    const y = parseFloat(document.getElementById('y').value);

    if (isNaN(x) || isNaN(y)) {
        alert("Please enter a valid number.");
        return;
    }

    const newPoint = new Point(x, y);
    points.push(newPoint);

    sortPointsByCoordinates(points);
    displayPoints();
    updateChart(); 
    document.getElementById('x').value = '';
    document.getElementById('y').value = '';
}

function displayPoints() {
    const pointsList = document.getElementById('pointsList');
    pointsList.innerHTML = points.map(point => point.show()).join('<br>');
}

function calculatePathLength(points) {
    let totalDistance = 0;

    for (let i = 0; i < points.length - 1; i++) {
        const x1 = points[i].x;
        const y1 = points[i].y;
        const x2 = points[i + 1].x;
        const y2 = points[i + 1].y;

        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        totalDistance += distance;
    }

    return totalDistance;
}

function calculatePath() {
    const totalDistance = calculatePathLength(points);
    document.getElementById('pathLength').innerText = `Path length is ${totalDistance}`;
}

function updateChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    const data = {
        labels: points.map(p => `(${p.x}, ${p.y})`),
        datasets: [{
            label: 'Path Line',
            data: points.map(p => ({
                x: p.x,
                y: p.y
            })),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 5,
            fill: false,
            tension: 1,
            pointStyle: 'circle', 
            pointRadius: 5,  
            pointBackgroundColor: 'rgba(75, 192, 192, 1)' 
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: 0,  
                    max: 10,  
                    ticks: {
                        stepSize: 1  
                    }
                },
                y: {
                    min: 0,  
                    max: 10,  
                    ticks: {
                        stepSize: 1  
                    }
                }
            }
        }
    };

    if (lineChart) {
        lineChart.destroy();  
    }

    lineChart = new Chart(ctx, config);  
}
function pointExistsInArray(points, pointFind) {
    for (let point of points) {
        if (point.equals(pointFind)) {
            return true;
        }
    }
    return false;
} 
