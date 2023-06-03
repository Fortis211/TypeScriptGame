class GameLogic {
  public colorsArr: string[] = [];
  private solutionArr: string[] = [];
  public roundColors: string[] = [];
  public round: number = 0;
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
  checkState(round:string): boolean {
    this.roundColors = [];
    const gameGrid = document.getElementById('grid'+round) as HTMLDivElement;
    const gridCell = gameGrid.getElementsByTagName('div');
    for (let index = 0; index < this.patternLen; index++) {
      this.roundColors.push(gridCell[index].style.backgroundColor);
    }
    let state: [number,number,number] = [0,0,0]; // correct, misplaced, wrong
    this.roundColors.forEach((element, index) =>{
      // correct values
      if(element==this.solutionArr[index]){
        state[0]+=1;
      }
      // misplaced values
      if(this.solutionArr.includes(element)){
        state[1]+=1;
      }
    })
    state[2] = this.patternLen - state[1]; 
    state[1] -= state[0];
    let options = ["correct", "misplaced", "wrong"];
    for (let index = 0; index < 3; index++) {
      (document.getElementById(options[index]+round) as HTMLDivElement).innerText = state[index].toString();
    }
    return this.patternLen == state[0] ? true : false;
  }
  generateSolution(){
    let solutionIndices: number[] = [];
    for (let index = 0; index < this.patternLen; index++) {
      let randInt = Math.floor(Math.random()*this.colorNumber);
      if(this.repeatColors){
        solutionIndices.push(randInt);
      } else{
        while (solutionIndices.includes(randInt)){
          randInt = Math.floor(Math.random()*this.colorNumber);
        }
        solutionIndices.push(randInt);
      }
    }
    const colors = document.getElementById('selectColors') as HTMLDivElement;
    const colorsDivs = colors.getElementsByTagName('div');
    solutionIndices.forEach(element => {
      this.solutionArr.push(colorsDivs[element].style.backgroundColor);
    });
  }
  displayColors() {
    const colorsSection = document.getElementById(
      "selectColors"
    ) as HTMLDivElement;
    colorsSection.innerHTML = "";
    this.colorsArr.forEach((element, index) => {
      let div = document.createElement("div");
      div.setAttribute("class", "colors");
      div.setAttribute("id", "color" + index);
      div.setAttribute("draggable", 'true');
      div.setAttribute("ondragstart", 'drag(event)');
      div.style.backgroundColor = element;
      colorsSection.appendChild(div);
    });
  }
  clear() {
    const colorsSection = document.getElementById(
      "selectColors"
    ) as HTMLDivElement;
    colorsSection.innerHTML = "";
    const gameArea = document.getElementById("gameArea") as HTMLDivElement;
    gameArea.innerHTML = "";
  }
  createRound() {
    const gameArea = document.getElementById("gameArea") as HTMLDivElement;
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
      gameColor.setAttribute('ondrop',"drop(event)");
      gameColor.setAttribute('ondragover',"allowDrop(event)");
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

function onCheckButton(event: Event) {
  (event.target as HTMLButtonElement).disabled = true;
  let round = (event.target as HTMLButtonElement).id;
  round = round.slice(6);
  (
    document.getElementById("grid" + round) as HTMLDivElement
    ).style.pointerEvents = "none";
    let isSolved = oGameLogic.checkState(round);
    if(isSolved){
      (event.target as HTMLButtonElement).disabled = true;
      (event.target as HTMLButtonElement).innerText = 'You guessed the pattern!';
      (document.getElementById("grid" + round) as HTMLDivElement).style.backgroundColor = 'rgb(255,255,200)';
      alert('You won :)');
      //to be completed
    } else {
      oGameLogic.createRound();
    }
  }

function numberInputLen(event: Event) {
  let val = parseInt((event.target as HTMLInputElement).value);
  if (val > 10) {
    (event.target as HTMLInputElement).value = "10";
  }
  if (val <= 0) {
    (event.target as HTMLInputElement).value = "1";
  }
  if (!repeatColors) {
    let cols = parseInt(
      (document.getElementById("numOfColorsInput") as HTMLInputElement).value
    );
    if (cols <= val) {
      (document.getElementById("numOfColorsInput") as HTMLInputElement).value =
        val.toString();
    }
  }
}
function numberInputCol(event: Event) {
  let val = parseInt((event.target as HTMLInputElement).value);
  if (val > 25) {
    (event.target as HTMLInputElement).value = "25";
  }
  if (val <= 0) {
    (event.target as HTMLInputElement).value = "1";
  }
  if (!repeatColors) {
    let len = parseInt(
      (document.getElementById("patternLengthInput") as HTMLInputElement).value
    );
    if (val <= len) {
      (document.getElementById("numOfColorsInput") as HTMLInputElement).value =
        len.toString();
    }
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

  let cols =  (document.getElementById("numOfColorsInput") as HTMLInputElement);
  let len =   (document.getElementById("patternLengthInput") as HTMLInputElement);
  if(parseInt(cols.value) < parseInt(len.value)) {
    cols.value =  len.value;
  }


}

//drag & drop events
function drop(event: Event) {
  event.preventDefault();
  let droppedColorId = ((event as DragEvent).dataTransfer as DataTransfer).getData('text');
  let colVal = (document.getElementById(droppedColorId) as HTMLDivElement).style.backgroundColor;
  (event.target as HTMLDivElement).style.backgroundColor = colVal;
}

function allowDrop(event:Event) {
  event.preventDefault();
}

function drag(event:Event){
  ((event as DragEvent).dataTransfer as DataTransfer).setData('text', (event.target as HTMLElement).id);
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
  oGameLogic.clear();
  oGameLogic.createColorArr();
  oGameLogic.displayColors();
  oGameLogic.generateSolution();
  oGameLogic.createRound();
  isInitialized = true;
}
