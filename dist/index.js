"use strict";
class GameLogic {
    constructor(colorNumber, patternLen, repeatColors) {
        this.colorNumber = colorNumber;
        this.patternLen = patternLen;
        this.repeatColors = repeatColors;
    }
}
function numberInputLen(event) {
    let val = parseInt(event.target.value);
    if (val > 10) {
        document.getElementById('patternLengthInput').value = '10';
    }
    if (val < 2) {
        document.getElementById('patternLengthInput').value = '2';
    }
}
function numberInputCol(event) {
    let val = parseInt(event.target.value);
    if (val > 100) {
        document.getElementById('numOfColorsInput').value = '100';
    }
    if (val < 3) {
        document.getElementById('numOfColorsInput').value = '3';
    }
}
function yesBtnClicked(event) {
    document.getElementById("repeatBtnYes").disabled =
        true;
    document.getElementById("repeatBtnNo").disabled =
        false;
    repeatColors = true;
}
function noBtnClicked(event) {
    document.getElementById("repeatBtnYes").disabled =
        false;
    document.getElementById("repeatBtnNo").disabled = true;
    repeatColors = false;
}
let repeatColors = true;
let oGameLogic;
let isInitialized = false;
const start = document.getElementById("startBtn");
start.addEventListener("click", onStartBtnClick);
function onStartBtnClick(event) {
    let patternLen = parseInt(document.getElementById("patternLengthInput").value);
    let colorNum = parseInt(document.getElementById("numOfColorsInput").value);
    oGameLogic = new GameLogic(colorNum, patternLen, repeatColors);
    isInitialized = true;
}
