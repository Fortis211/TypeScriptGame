class GameLogic {
  public colorsArr: string[] = [];
  constructor(
    public colorNumber: number,
    public patternLen: number,
    public repeatColors: boolean
  ) {}
  createColorArr() {
    let offset = 50 * Math.random();
    for (let index = 0; index < this.colorNumber; index++) {
      this.colorsArr.push(
        "hsl(" +
          (index * (360 / this.colorNumber) + (offset % 360)) +
          ",100%,50%)"
      );
    }
  }
  displayColors() {
    const colorsSection = document.getElementById(
      "selectColors"
    ) as HTMLDivElement;
    colorsSection.innerHTML = "";
    this.colorsArr.forEach((element, index) => {
      let div = document.createElement("div");
      div.setAttribute("class", "colors");
      div.setAttribute("id",'color'+index);
      div.style.backgroundColor = element;
      colorsSection.appendChild(div);
    });
  }
}

function numberInputLen(event: Event) {
  let val = parseInt((event.target as HTMLInputElement).value);
  if (val > 10) {
    (document.getElementById("patternLengthInput") as HTMLInputElement).value =
      "10";
  }
  if (val < 0) {
    (document.getElementById("patternLengthInput") as HTMLInputElement).value =
      "1";
  }
}
function numberInputCol(event: Event) {
  let val = parseInt((event.target as HTMLInputElement).value);
  if (val > 25) {
    (document.getElementById("numOfColorsInput") as HTMLInputElement).value =
      "25";
  }
  if (val < 0) {
    (document.getElementById("numOfColorsInput") as HTMLInputElement).value =
      "1";
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
  oGameLogic.createColorArr();
  oGameLogic.displayColors();
  isInitialized = true;
}
