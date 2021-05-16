// DOM Elements
const time = document.querySelector('#time'),
greeting = document.querySelector('#greeting'),
name = document.querySelector('#name'),
focus = document.querySelector('#focus');

// Show Time
function showTime() {
    let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    // Set AM or PM
    const amPm = hour >= 12? 'PM' : 'AM';

    // 12hr format
    hour = hour % 12 || 12;

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);
}

// Add zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0': '') + n;
}

// Run
showTime();