"use strict";
const timer = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');
const pauseBtn = document.getElementById('pause-btn');
const lapList = document.getElementById('lap-list');



let hrs;
let mins;
let secs;
let interval;
let passedTime = 0;
let startTime;
let lapCount = 1;
let lapEnabled = false;

startBtn.addEventListener("click", start);
resetBtn.addEventListener("click", reset);
pauseBtn.addEventListener("click", pause);
lapBtn.addEventListener("click", lap);


function start() {
    if(!interval) {
        startTime = new Date().getTime() - passedTime;
        interval = setInterval(updateTime, 1000);
        lapBtn.style.opacity = 1;
        lapBtn.removeAttribute("disabled");
    }
}



function pause() {
    clearInterval(interval);
    passedTime = new Date().getTime() - startTime;
    interval = null;
    lapBtn.setAttribute("disabled", "");
}


function reset() {
    pause();
    passedTime = 0;
    timer.textContent = "00:00:00";
    lapBtn.style.opacity = 0.15;      
    lapBtn.setAttribute("disabled", "");
    while(lapList.firstChild) { 
        lapList.removeChild(lapList.firstChild); 
    } 
}
  

function lap(lapenabled) {
    if (lapenabled) {
        const lapBox = document.createElement("div");
        const lapSpan1 = document.createElement("span");
        const lapSpan2 = document.createElement("span");

        const lapStartTime = new Date().getTime();
        let lapPassedTime;
        const lapInterval = setInterval(function() {
            lapPassedTime = new Date().getTime() - lapStartTime;
            const lapSecs = Math.floor((lapPassedTime / 1000) % 60);
            const lapMins = Math.floor((lapPassedTime / 1000 / 60) % 60);
            const lapHrs = Math.floor((lapPassedTime / 1000 / 60 / 60) % 60);            
            lapSpan2.textContent = `${padding(lapHrs)}:${padding(lapMins)}:${padding(lapSecs)}`;
        }, 1000);
        // lapSpan1.id = `Lap-${lapCount}`;
        // lapSpan2.id = `lap-timer-${lapCount}`;
        lapBox.id = "lap-box";
        lapBox.style.width = "350px";   
        lapBox.style.display = "flex";
        lapBox.style.padding = "0.5rem";
        lapBox.style.justifyContent = "space-between";
        
        lapSpan1.textContent = `Lap ${lapCount}`;
        lapCount++;
        lapBox.append(lapSpan1, lapSpan2);
        lapList.append(lapBox);
    }
}

function updateTime() {
    passedTime = new Date().getTime() - startTime;  //time in milliseconds
    secs = Math.floor((passedTime / 1000) % 60);
    mins = Math.floor((passedTime / 1000 / 60) % 60);
    hrs = Math.floor((passedTime / 1000 / 60 / 60) % 60);
    
    timer.textContent = `${padding(hrs)}:${padding(mins)}:${padding(secs)}`;

}

function padding(unit) {
    return (unit < 10 ? "0" : "") + unit;
}