let duck;
const quackDisplay = document.getElementById("quackDisplay");
const duckInfoElement = document.getElementById("duckInfo");

class Duck {
  constructor(name, color, age, weight, image) {
    this.name = name;
    this.color = color;
    this.age = age;
    this.weight = weight;
    this.image = image;
  }

  show() {
    clearContent();
    duckInfoElement.innerHTML = `
             <strong>Name:</strong> ${this.name}<br>
             <strong>Color:</strong> ${this.color}<br>
             <strong>Age:</strong> ${this.age} years<br>
             <strong>Weight:</strong> ${this.weight} kg<br>
             <img src="${this.image}">
        `;
  }

  quack() {
    clearContent();
    const quackCount = Math.floor((this.age * this.weight) / 2);
    if (quackCount < 1) {
      quackDisplay.innerHTML = "Not enough age or weight for a quack!";
      return;
    }

    let quacks = [];
    for (let i = 0; i < quackCount; i++) {
      quacks.push("Quack!");
    }
    quackDisplay.textContent = quacks.join(" ");

    var count = 0;
    var playTimes = 3;
    const sound = new Audio("../assets/quack_5.mp3");
    // using 'ended' event listener so quacks will not be heard in the same time
    sound.addEventListener("ended", () => {
      count++;
      if (count < playTimes) {
        sound.currentTime = 0; // sound reset
        sound.play();
      }
    });
    sound.play();
  }
}

function clearContent() {
  quackDisplay.textContent = "";
  duckInfoElement.textContent = "";
}

document
  .getElementById("duckForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const color = document.getElementById("color").value;
    const age = Number(document.getElementById("age").value);
    const weight = Number(document.getElementById("weight").value);
    const imageInput = document.getElementById("image");
    const image = imageInput.files[0]
      ? URL.createObjectURL(imageInput.files[0])
      : null;

    duck = new Duck(name, color, age, weight, image);

    document.getElementById("createDuckButton").disabled = true;
    document.getElementById("showButton").style.display = "inline-block";
    document.getElementById("quackButton").style.display = "inline-block";
    document.getElementById("showButton").disabled = false;
    document.getElementById("quackButton").disabled = false;
  });

document.getElementById("showButton").addEventListener("click", function () {
  duck.show();
});

document.getElementById("quackButton").addEventListener("click", function () {
  duck.quack();
});
