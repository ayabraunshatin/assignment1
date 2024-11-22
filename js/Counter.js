let counter;

class Counter {
    constructor(number = 0) {
        this.number = number;
    }

    initialize(value) {
        this.number = value;
    }

    increment() {
        this.number++;
    }

    go() {
        let result = "";
        for (let i = 0; i <= this.number; i++) {
            result += i + " ";
        }
        return result.trim();
    }
}

const input = document.getElementById("counterValue");
const startButton = document.getElementById("startButton");
const incrementButton = document.getElementById("incrementButton");
const goButton = document.getElementById("goButton");
const clearButton = document.getElementById("clearButton");
const output = document.getElementById("output");

startButton.addEventListener("click", () => {
    const value = parseInt(input.value);
    if (isNaN(value)) {
        alert("Please enter a number");
        input.value = "";
        startButton.disabled = false;
        incrementButton.disabled = true;
        goButton.disabled = true;
        clearButton.disabled = true;
    } else {
        counter = new Counter(value);
        input.value = value;
        startButton.disabled = true;
        incrementButton.disabled = false;
        goButton.disabled = false;
        clearButton.disabled = false;
    }
});

input.addEventListener("input", () => {
    const value = parseInt(input.value);
    if (isNaN(value) || value <= 0) {
        startButton.disabled = false;
        incrementButton.disabled = true;
        goButton.disabled = true;
        clearButton.disabled = true;
    } else {
        startButton.disabled = false;
        incrementButton.disabled = true;
        goButton.disabled = true;
        clearButton.disabled = true;
    }
});

incrementButton.addEventListener("click", () => {
    if (counter) {
        counter.increment();
        input.value = counter.number;
    }
});

goButton.addEventListener("click", () => {
    if (counter) {
        output.textContent = counter.go();
    }
});

clearButton.addEventListener("click", () => {
    input.value = "";
    output.textContent = "";
    counter = null;
    startButton.disabled = false;
    incrementButton.disabled = true;
    goButton.disabled = true;
    clearButton.disabled = true;
});
