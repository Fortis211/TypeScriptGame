"use strict";
class GameLogic {
    constructor(colorNumber, patternLen, repeatColors) {
        this.colorNumber = colorNumber;
        this.patternLen = patternLen;
        this.repeatColors = repeatColors;
        this.colorsArr = [];
    }
    createColorArr() {
        let offset = 50 * Math.random();
        for (let index = 0; index < this.colorNumber; index++) {
            this.colorsArr.push("hsl(" +
                (index * (360 / this.colorNumber) + (offset % 360)) +
                ",100%,50%)");
        }
    }
    displayColors() {
        const colorsSection = document.getElementById("selectColors");
        colorsSection.innerHTML = "";
        this.colorsArr.forEach((element, index) => {
            let div = document.createElement("div");
            div.setAttribute("class", "colors");
            div.setAttribute("id", 'color' + index);
            div.style.backgroundColor = element;
            colorsSection.appendChild(div);
        });
    }
}
function numberInputLen(event) {
    let val = parseInt(event.target.value);
    if (val > 10) {
        document.getElementById("patternLengthInput").value =
            "10";
    }
    if (val < 0) {
        document.getElementById("patternLengthInput").value =
            "1";
    }
}
function numberInputCol(event) {
    let val = parseInt(event.target.value);
    if (val > 25) {
        document.getElementById("numOfColorsInput").value =
            "25";
    }
    if (val < 0) {
        document.getElementById("numOfColorsInput").value =
            "1";
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
    oGameLogic.createColorArr();
    oGameLogic.displayColors();
    isInitialized = true;
}
