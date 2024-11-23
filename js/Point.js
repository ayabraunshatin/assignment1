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
  const x = parseFloat(document.getElementById("x").value);
  const y = parseFloat(document.getElementById("y").value);

  if (isNaN(x) || isNaN(y)) {
    alert("Please enter a valid number.");
    return;
  }

  const newPoint = new Point(x, y);
  points.push(newPoint);

  sortPointsByCoordinates(points);
  displayPoints();
  updateChart();
  document.getElementById("x").value = "";
  document.getElementById("y").value = "";
}

function displayPoints() {
  const pointsList = document.getElementById("pointsList");
  pointsList.innerHTML = points.map((point) => point.show()).join("<br>");
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
  document.getElementById(
    "pathLength"
  ).innerText = `Path length is ${totalDistance.toFixed(2)}`;
}

function updateChart() {
  const ctx = document.getElementById("lineChart").getContext("2d");
  const data = {
    labels: points.map((p) => `(${p.x}, ${p.y})`),
    datasets: [
      {
        label: "Path Line",
        data: points.map((p) => ({
          x: p.x,
          y: p.y,
        })),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 5,
        fill: false,
        tension: 1,
        pointStyle: "circle",
        pointRadius: 5,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          min: 0,
          max: 10,
          ticks: {
            stepSize: 1,
          },
        },
        y: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  };

  if (lineChart) {
    lineChart.destroy();
  }

  lineChart = new Chart(ctx, config);
}

// Check if a point exists in the array by x and y
function pointExistsInArray(x, y, points) {
  let resultDiv = document.getElementById("checkResult");

  for (let i = 0; i < points.length; i++) {
    if (points[i].x == x && points[i].y == y) {
      resultDiv.innerHTML += `<p>Point (${points[i].x},${points[i].y}) exists!</p>`;
      return true;
    }
  }
  resultDiv.innerHTML += `<p>Point (${x},${y}) does not exist!</p>`;
  return false;
}

function pointExistsInArrayWithEquals(point, points) {
  let resultDiv = document.getElementById("checkResultEquals");

  for (let i = 0; i < points.length; i++) {
    if (point.equals(points[i])) {
      resultDiv.innerHTML += `<p>Point (${point.x},${point.y}) exists!</p>`;
      return true;
    }
  }
  resultDiv.innerHTML += `<p>Point (${point.x},${point.y}) does not exist!</p>`;
  return false;
}

// Event listeners for the buttons
document
  .getElementById("checkExistsBttn")
  .addEventListener("click", function () {
    let x = parseFloat(document.getElementById("checkX").value);
    let y = parseFloat(document.getElementById("checkY").value);
    pointExistsInArray(x, y, points);
  });

document
  .getElementById("checkExistsEqualsBttn")
  .addEventListener("click", function () {
    let x = parseFloat(document.getElementById("checkQX").value);
    let y = parseFloat(document.getElementById("checkQY").value);
    let point = new Point(x, y);
    pointExistsInArrayWithEquals(point, points);
  });

// starting example
points = [new Point(1, 1), new Point(4, 5), new Point(7, 8), new Point(10, 2)];

sortPointsByCoordinates(points);
displayPoints();
updateChart();
calculatePath();

// EXAMPLES FOR QUESTION 1 AND 2

pointExistsInArray(1, 1, points);
pointExistsInArray(4, 2, points);

let pointExampleI = new Point(7, 8);
let pointExampleII = new Point(9, 3);

pointExistsInArrayWithEquals(pointExampleI, points);
pointExistsInArrayWithEquals(pointExampleII, points);
