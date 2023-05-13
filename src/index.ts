class GameLogic {
  constructor(
    public colorNumber: number,
    public patternLen: number,
    public repeatColors: boolean
  ) {}
}

function numberInputLen(event: Event) {
    let val = parseInt((event.target as HTMLInputElement).value);
  if(val > 10) {
    (document.getElementById('patternLengthInput') as HTMLInputElement).value = '10';
  }
  if(val < 2) {
    (document.getElementById('patternLengthInput') as HTMLInputElement).value = '2';
  }
}
function numberInputCol(event: Event) {
    let val = parseInt((event.target as HTMLInputElement).value);
    if(val > 100) {
        (document.getElementById('numOfColorsInput') as HTMLInputElement).value = '100';
      }
      if(val < 3) {
        (document.getElementById('numOfColorsInput') as HTMLInputElement).value = '3';
      }
}

function yesBtnClicked(event: Event) {
  (document.getElementById("repeatBtnYes") as HTMLButtonElement).disabled =
    true;
  (document.getElementById("repeatBtnNo") as HTMLButtonElement).disabled =
    false;
  repeatColors = true;
}
function noBtnClicked(event: Event) {
  (document.getElementById("repeatBtnYes") as HTMLButtonElement).disabled =
    false;
  (document.getElementById("repeatBtnNo") as HTMLButtonElement).disabled = true;
  repeatColors = false;
}
//Game Settings elements

let repeatColors: boolean = true;

//start Game
let oGameLogic: GameLogic;
let isInitialized: boolean = false;

const start = document.getElementById("startBtn") as HTMLButtonElement;
start.addEventListener("click", onStartBtnClick);
function onStartBtnClick(event: Event) {
  let patternLen = parseInt(
    (document.getElementById("patternLengthInput") as HTMLInputElement).value
  );
  let colorNum = parseInt(
    (document.getElementById("numOfColorsInput") as HTMLInputElement).value
  );
  oGameLogic = new GameLogic(colorNum, patternLen, repeatColors);
  isInitialized = true;
  
}

