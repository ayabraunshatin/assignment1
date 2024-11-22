let clock;
let clocks = [];

class Clock {
    constructor(hours, minutes, seconds, country) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.country = country;
    }

    convertToSeconds() {
        return (this.hours * 3600) + (this.minutes * 60) + this.seconds;
    }

    show() {
        const formattedHours = this.hours < 10 ? `0${this.hours}` : this.hours;
        const formattedMinutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
        const formattedSeconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    displayTime() {
        console.log(`The time in ${this.country} is ${this.show()}`);
    }
}

document.getElementById("clockForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const hours = parseInt(document.getElementById("hours").value);
    const minutes = parseInt(document.getElementById("minutes").value);
    const seconds = parseInt(document.getElementById("seconds").value);
    const country = document.getElementById("country").value;

    const clock = new Clock(hours, minutes, seconds, country);
    clocks.push(clock);

    document.getElementById("hours").value = '';
    document.getElementById("minutes").value = '';
    document.getElementById("seconds").value = '';
    document.getElementById("country").value = '';

    displayClocks();
});

function displayClocks() {
    if (clocks.length === 5) {
        const clockListDiv = document.getElementById("clockList");
        clockListDiv.innerHTML = ''; 

        clocks.forEach(clock => {
            const clockInfo = document.createElement('div');
            clockInfo.innerHTML = `
                <strong>country:</strong> ${clock.country}<br>
                <strong>hour:</strong> ${clock.show()}<br>
            `;
            clockListDiv.appendChild(clockInfo);
        });
    }
}
