/* The timer thing is clearly transitioning to a singleton */

let running = false;
let working = true;
let workSetting = 0;
let relapseSetting = 0;
let displayId;

function startTimer(){
    if(running) return;
    running = true;
    updateDisplay();
}

function stopTimer(){
    running = false;
    clearTimeout(displayId);
}

function resetTimer(){
    stopTimer();
    if(working){
        if(workSetting < 10) updateTimer("0" + workSetting + ":00");
        else updateTimer(workSetting + ":00");
    }
    else {
        if(relapseSetting < 10) updateTimer("0" + relapseSetting + ":00");
        else updateTimer(relapseSetting + ":00");
    }
}

async function updateTimer(newSetting){
    document.getElementById("stopwatch-display").innerHTML = newSetting;
}

async function updateDisplay(){
    var timer = document.getElementById("stopwatch-display");
    if(timer.innerHTML == "00:00"){
        stopTimer();
        return
    }
    var minutes = timer.innerHTML.split(":")[0];
    var seconds = timer.innerHTML.split(":")[1];
    if(seconds == "00"){
        minutes --;
        if(minutes.toString().length == 1) minutes = "0" + minutes;
        seconds = "59"
    }
    else {
        seconds --;
        if(seconds.toString().length == 1) seconds = "0" + seconds;
    }
    updateTimer(minutes + ":" + seconds);
    await new Promise(resolve => displayId = setTimeout(resolve, 1000));
    updateDisplay();
}

function ring(){

}

function toggleMute(){

}

function openMenu(){
    document.getElementById("dropdown-menu").classList.toggle("open-menu");
}

function moreRelapse(){
    relapseSetting = addMinute(relapseSetting);
    updateRelapse();
}
function lessRelapse(){
    relapseSetting = substractMinute(relapseSetting);
    updateRelapse();
}
function updateRelapse(){
    if(relapseSetting < 10) document.getElementById("relapse-time").innerHTML = "0" + relapseSetting + ":00";
    else document.getElementById("relapse-time").innerHTML = relapseSetting + ":00";
}
function moreWork(){
    workSetting = addMinute(workSetting);
    updateWork();
}
function lessWork(){
    workSetting = substractMinute(workSetting);
    updateWork();
}
function updateWork(){
    if(workSetting < 10) document.getElementById("work-time").innerHTML = "0" + workSetting + ":00";
    else document.getElementById("work-time").innerHTML = workSetting + ":00";
}

function addMinute(minutes){
    if(minutes == 90) return minutes;
    return minutes + 1;
}

function substractMinute(minutes){
    if(minutes == 0) return minutes;
    return minutes - 1;
}

function relapse(){
    working = false;
    resetTimer();
}

function work(){
    working = true;
    resetTimer();
}

function saveSettings(){
    workSetting = Number(document.getElementById("work-time").innerHTML.split(":")[0]);
    relapseSetting = Number(document.getElementById("relapse-time").innerHTML.split(":")[0]);
}