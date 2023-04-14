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
    relapseSetting = add5Minutes(relapseSetting);
    updateRelapse();
}
function lessRelapse(){
    relapseSetting = substract5Minutes(relapseSetting);
    updateRelapse();
}
function updateRelapse(){
    if(relapseSetting < 10) document.getElementById("relapse-time").innerHTML = "0" + relapseSetting + ":00";
    else document.getElementById("relapse-time").innerHTML = relapseSetting + ":00";
}
function moreWork(){
    workSetting = add5Minutes(workSetting);
    updateWork();
}
function lessWork(){
    workSetting = substract5Minutes(workSetting);
    updateWork();
}
function updateWork(){
    if(workSetting < 10) document.getElementById("work-time").innerHTML = "0" + workSetting + ":00";
    else document.getElementById("work-time").innerHTML = workSetting + ":00";
}

function add5Minutes(minutes){
    if(minutes == 90) return minutes;
    return minutes + 5;
}

function substract5Minutes(minutes){
    if(minutes == 0) return minutes;
    return minutes - 5;
}

function relapse(){
    if(working){
        working = false;
        resetTimer();
        document.getElementById("status-text").innerHTML = "Relapsing :)";
        document.getElementById("status-text").classList.add("relapsing");
        document.getElementById("work-button").classList.remove("current-mode-button");
        document.getElementById("relapse-button").classList.add("current-mode-button");
    }    
}

function work(){
    if(! working){
        working = true;
        resetTimer();
        document.getElementById("status-text").innerHTML = "Working!";
        document.getElementById("status-text").classList.remove("relapsing");
        document.getElementById("work-button").classList.add("current-mode-button");
        document.getElementById("relapse-button").classList.remove("current-mode-button");
    }
}
