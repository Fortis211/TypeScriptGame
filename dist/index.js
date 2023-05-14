"use strict";
class GameLogic {
    constructor(colorNumber, patternLen, repeatColors) {
        this.colorNumber = colorNumber;
        this.patternLen = patternLen;
        this.repeatColors = repeatColors;
        this.colorsArr = [];
        this.round = 0;
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
            div.setAttribute("id", "color" + index);
            div.style.backgroundColor = element;
            colorsSection.appendChild(div);
        });
    }
    clear() {
        const colorsSection = document.getElementById("selectColors");
        colorsSection.innerHTML = "";
        const gameArea = document.getElementById("gameArea");
        gameArea.innerHTML = "";
    }
    createRound() {
        const gameArea = document.getElementById("gameArea");
        let gameRound = document.createElement("div");
        gameRound.setAttribute("id", "round" + this.round);
        gameRound.setAttribute("class", "gameRound");
        let gameResult = document.createElement("div");
        gameResult.setAttribute("id", "result" + this.round);
        gameResult.setAttribute("class", "gameResult");
        let gameGrid = document.createElement("div");
        gameGrid.setAttribute("id", "grid" + this.round);
        gameGrid.setAttribute("class", "gameGrid");
        let gameCheck = document.createElement("div");
        gameCheck.setAttribute("id", "check" + this.round);
        gameCheck.setAttribute("class", "gameCheck");
        for (let index = 0; index < this.patternLen; index++) {
            let gameColor = document.createElement("div");
            gameColor.style.backgroundColor = "white";
            gameColor.setAttribute("class", "colors");
            gameColor.setAttribute("id", "index" + index);
            gameGrid.appendChild(gameColor);
        }
        let checkButton = document.createElement("button");
        checkButton.setAttribute("id", "button" + this.round);
        checkButton.setAttribute("class", "gameButton");
        checkButton.innerText = "Check";
        checkButton.addEventListener("click", onCheckButton);
        gameCheck.appendChild(checkButton);
        let options = ["correct", "misplaced", "wrong"];
        let colors = ["green", "blue", "red"];
        for (let index = 0; index < 3; index++) {
            let el = document.createElement("div");
            el.setAttribute("id", options[index] + this.round);
            el.setAttribute("class", "resultElement");
            el.innerText = "0";
            gameResult.appendChild(el);
            let elIcon = document.createElement("div");
            elIcon.style.backgroundColor = colors[index];
            elIcon.setAttribute("class", "resultIcons");
            gameResult.appendChild(elIcon);
        }
        gameRound.appendChild(gameResult);
        gameRound.appendChild(gameGrid);
        gameRound.appendChild(gameCheck);
        gameArea.insertBefore(gameRound, gameArea.firstChild);
        this.round += 1;
    }
}
function onCheckButton(event) {
    oGameLogic.createRound();
    event.target.disabled = true;
    let round = event.target.id;
    round = round.slice(6);
    document.getElementById("grid" + round).style.pointerEvents = "none";
}
function numberInputLen(event) {
    let val = parseInt(event.target.value);
    if (val > 10) {
        event.target.value = "10";
    }
    if (val <= 0) {
        event.target.value = "1";
    }
    if (!repeatColors) {
        let cols = parseInt(document.getElementById("numOfColorsInput").value);
        if (cols <= val) {
            document.getElementById("numOfColorsInput").value =
                val.toString();
        }
    }
}
function numberInputCol(event) {
    let val = parseInt(event.target.value);
    if (val > 25) {
        event.target.value = "25";
    }
    if (val <= 0) {
        event.target.value = "1";
    }
    if (!repeatColors) {
        let len = parseInt(document.getElementById("patternLengthInput").value);
        if (val <= len) {
            document.getElementById("numOfColorsInput").value =
                len.toString();
        }
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
    let cols = document.getElementById("numOfColorsInput");
    let len = document.getElementById("patternLengthInput");
    if (parseInt(cols.value) < parseInt(len.value)) {
        cols.value = len.value;
    }
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
    oGameLogic.clear();
    oGameLogic.createColorArr();
    oGameLogic.displayColors();
    oGameLogic.createRound();
    isInitialized = true;
}
