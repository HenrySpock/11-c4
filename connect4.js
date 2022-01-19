/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//GLOBALS
let WIDTH = 7; //game board width
let HEIGHT = 6; //game board height
let currPlayer = 1; // active player: 1 or 2
let turn = 1; //setting the starting turn
let board = [ [0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0] ]; //initial board matrix
              // array of rows, each row is array of cells  (board[y][x]): 
              //0: empty; 1: blue; 2: red
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

//FUNCTIONS
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j< board[i].length; j++){
      board[i][j] = 0; //sets/resets board matrix values to 0 at start of game
    }
  }  
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  // TODO: add comment for this code
  let top = document.createElement("tr"); //creates table row for "top" of board
  top.setAttribute("id", "column-top"); //sets id for top row by incremented iteration: note this top row 
  //has a one-dimensional id, because it's not truly part of the game board space; the cells below all have 
  //two-dimensional ids for checking game state
  top.addEventListener("click", handleClick); //adds a click handler eventListener to "column-top" 

  for (var x = 0; x < WIDTH; x++) { //iterates on top row to create unique id, the row not exceeding the global WIDTH variable set to 7
    let headCell = document.createElement("td"); //creates table data element
    headCell.setAttribute("id", x); //sets element id with incremented "x" value
    top.append(headCell); //appends the "headcell" row to the tr, called "top"
  }

  document.getElementById("board").append(top); //appends "top" to the html id element "board";
  //the dashed and yellow color styles are assigned to #column-top in css

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { //iterates on the global HEIGHT variable set to 6
    const row = document.createElement("tr"); //creates a new table row 6 times
    for (let x = 0; x < WIDTH; x++) { //iterates on the global WIDTH variable set to 7
      const cell = document.createElement("td"); //creates new table data row 
      cell.setAttribute("id", `${y}-${x}`); //sets two dimensional id equal to incremented iteration: nb, 
      //this id is designated YX, *NOT* XY, presumably because the board is being created by rows and not 
      //by columns: when checking game state, the vertically placed row would be checked first, then the 
      //horizontally placed cell.
      row.append(cell); //appends td to created tr in a number equel to WIDTH variable, currently 7
    }
    document.getElementById("board").append(row); //appends rows to "board" in number equal to global HEIGHT variable of 6
  }
  setTimeout(() => {alert(`Player ${currPlayer}, do your thing!`)}, 250); //A basic notification for the players that the game has started.
  document.getElementById("player").innerHTML = (`Player ${currPlayer}`); //Some simple game info for the players.
  document.getElementById("turn").innerHTML = (`Turn ${turn}`); //Some simple game info for the players.
}

// findSpotForCol: given column x, return top empty y (null if filled) 

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
     if      (board[5][x] === 0){
        return 5;}
    else if (board[4][x] === 0){
        return 4;}
    else if (board[3][x] === 0){
        return 3;}
    else if (board[2][x] === 0){
        return 2;}
    else if (board[1][x] === 0){
        return 1;}
    else if (board[0][x] === 0){
        return 0;}
      return null;

  //This is my attempt at making the above into a switch statement;
  // I am unsure how to get the variables defined, or if I am thinking 
  // about this incorrectly.

  // switch (board[y][x]) {}
  //   case (board[5][x] === 0):
  //   return 5;
  //   break;
  //   case (board[4][x] === 0):
  //   return 4;
  //   break;
  //   case (board[3][x] === 0):
  //   return 3;
  //   break;
  //   case (board[2][x] === 0):
  //   return 2;
  //   break;
  //   case (board[1][x] === 0):
  //   return 1;
  //   break;
  //   case (board[0][x] === 0):
  //   return 0;
  //   break;    
  // return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  let placementString = (`${y}-${x}`);
  let placement = document.getElementById(placementString)

  // TODO: make a div and insert into correct table cell
  let placedPiece = document.createElement("div");
  if (currPlayer === 1) {
  placedPiece.setAttribute("class", "piece playerOneColor")}
  else {
  placedPiece.setAttribute("class", "piece playerTwoColor")
  }
  
  placement.append(placedPiece);
  if (y === 0) {
    document.getElementById(x).setAttribute("class", "colFull");
  }   
}

/** endGame: announce game end */
function endGame(msg) { 
  alert(msg); 
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  board[y][x] = currPlayer;
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  // check for win
  if (checkForWin()) {
    if (currPlayer === 1) { 
      currPlayer = 2 
    } else {
      currPlayer = 1
    } //This if statement has to do with how the currPlayer is set and how the win msg alerts before 
    //the final piece is played; I circumvent that by switch currPlayer and alerting an interval of 50ml 
    //after the final piece shows up on the board.

    setTimeout(() => {return endGame(`Player ${currPlayer} won!`)}, 50);
    setTimeout(() => {playAgain()}, 200);

    function playAgain() {
        let onceMore = prompt("Play again? (y/n)"); 
        function clearElement(className){
            const el = document.getElementsByClassName(className);
            while(el.length > 0){
                el[0].parentNode.removeChild(el[0]);
            }
        }
    
        if (onceMore == "y") {
          makeBoard(); 
          clearElement("piece");
        }    
        else {
           alert("Shucks.")
           window.location.href = "http://nomoregames.com/";
        }
      }
    }
  
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  const isOccupied = (val) => val > 0;
  if(board.flat().every(isOccupied)){ 
    endGame("You both lose!"); //Because who wants a tie?
  };
  
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer === 1){
      ++currPlayer; 
    } else {
      --currPlayer; 
    }
    document.getElementById("player").innerHTML = (`Player ${currPlayer}`);
    document.getElementById("turn").innerHTML = (`Turn ${++turn}`);
  }

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer        
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  for (let y = 0; y < HEIGHT; y++) { //iterating through column
    for (let x = 0; x < WIDTH; x++) { //iterating through row of above column
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //creating a group of 4 horizontal cells to be checked against _win(horiz)
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //creating a group of 4 vertical cells to be checked against _win(vert)
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //creating a group of 4 diagonal=>"right from bottom" cells to be checked against _win(diagDR)
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //creating a group of 4 diagonal=>"left from bottom" cells to be checked against _win(diagDL)
  
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //checks the 4 potential winning scenarios against cells.every, which takes the current player pieces into consideration
        return true; //somebody won
      }
    }
  }
}

makeBoard();
makeHtmlBoard(); 
