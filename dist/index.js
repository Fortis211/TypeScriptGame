"use strict";
class GameLogic {
    constructor(colorNumber, patternLen, repeatColors) {
        this.colorNumber = colorNumber;
        this.patternLen = patternLen;
        this.repeatColors = repeatColors;
        this.colorsArr = [];
        this.solutionArr = [];
        this.roundColors = [];
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
    checkState(round) {
        this.roundColors = [];
        const gameGrid = document.getElementById('grid' + round);
        const gridCell = gameGrid.getElementsByTagName('div');
        for (let index = 0; index < this.patternLen; index++) {
            this.roundColors.push(gridCell[index].style.backgroundColor);
        }
        let state = [0, 0, 0];
        this.roundColors.forEach((element, index) => {
            if (element == this.solutionArr[index]) {
                state[0] += 1;
            }
            if (this.solutionArr.includes(element)) {
                state[1] += 1;
            }
        });
        state[2] = this.patternLen - state[1];
        state[1] -= state[0];
        let options = ["correct", "misplaced", "wrong"];
        for (let index = 0; index < 3; index++) {
            document.getElementById(options[index] + round).innerText = state[index].toString();
        }
        return this.patternLen == state[0] ? true : false;
    }
    generateSolution() {
        let solutionIndices = [];
        for (let index = 0; index < this.patternLen; index++) {
            let randInt = Math.floor(Math.random() * this.colorNumber);
            if (this.repeatColors) {
                solutionIndices.push(randInt);
            }
            else {
                while (solutionIndices.includes(randInt)) {
                    randInt = Math.floor(Math.random() * this.colorNumber);
                }
                solutionIndices.push(randInt);
            }
        }
        const colors = document.getElementById('selectColors');
        const colorsDivs = colors.getElementsByTagName('div');
        solutionIndices.forEach(element => {
            this.solutionArr.push(colorsDivs[element].style.backgroundColor);
        });
    }
    displayColors() {
        const colorsSection = document.getElementById("selectColors");
        colorsSection.innerHTML = "";
        this.colorsArr.forEach((element, index) => {
            let div = document.createElement("div");
            div.setAttribute("class", "colors");
            div.setAttribute("id", "color" + index);
            div.setAttribute("draggable", 'true');
            div.setAttribute("ondragstart", 'drag(event)');
            div.style.backgroundColor = element;
            div.style.width = (Math.floor(Math.random() * 20) + 15) + 'px';
            div.style.borderRadius = (Math.floor(Math.random() * 28) + 2) + 'px';
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
            gameColor.setAttribute('ondrop', "drop(event)");
            gameColor.setAttribute('ondragover', "allowDrop(event)");
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
    event.target.disabled = true;
    let round = event.target.id;
    round = round.slice(6);
    document.getElementById("grid" + round).style.pointerEvents = "none";
    let isSolved = oGameLogic.checkState(round);
    if (isSolved) {
        event.target.disabled = true;
        event.target.innerText = 'You guessed the pattern!';
        document.getElementById("grid" + round).style.backgroundColor = 'rgb(255,255,200)';
        alert('You won :)');
    }
    else {
        oGameLogic.createRound();
    }
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
function drop(event) {
    event.preventDefault();
    let droppedColorId = event.dataTransfer.getData('text');
    const draggedDiv = document.getElementById(droppedColorId);
    event.target.style.backgroundColor = draggedDiv.style.backgroundColor;
    event.target.style.width = draggedDiv.style.width;
    event.target.style.borderRadius = draggedDiv.style.borderRadius;
}
function allowDrop(event) {
    event.preventDefault();
}
function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}
let repeatColors = false;
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
    oGameLogic.generateSolution();
    oGameLogic.createRound();
    isInitialized = true;
}
