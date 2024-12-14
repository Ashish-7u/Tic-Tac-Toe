const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game
function initialize() {
    // Set Current Player to X 
    currentPlayer = 'X';
    gameInfo.textContent = `Current Player: ${currentPlayer}`;

    
    gameGrid = ["", "", "", "", "", "", "", "", ""]

    boxes.forEach((box, index)=>{
      box.innerText = "";
      boxes[index].style.pointerEvents = "all";
      box.classList = `box box${index+1}`;
    });

   

    // Remove Active Class From Button
    newGameBtn.classList.remove("active");
}

initialize();

function swapTurn(){
   if(currentPlayer==="X"){
      currentPlayer = "0";

   }
   else{
      currentPlayer = "X";

   }

   gameInfo.innerText =`Current player: ${currentPlayer}`;
}



// Handle Click Game 
function handleClick(index) {
    if (gameGrid[index] === "") {
        
        boxes[index].textContent = currentPlayer;
        gameGrid[index] = currentPlayer;
       ;
        gameInfo.textContent = `Current Player : ${currentPlayer}`;

        boxes[index].style.pointerEvents = "none"
       
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
   box.addEventListener("click",()=>{
      handleClick(index);
   })
});

function checkGameOver(){
   let answer = "";
   winningPositions.forEach((position) =>{
      if((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")&&
         (gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){

            //check if winner is x
            if(gameGrid[position[0]]==="X")
               answer ="X";
            else
            answer = "0";

            //disable
            boxes.forEach((box)=>{
               box.style.pointerEvents = "none";
            })

            //now we know  X/O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

         }
      
      });

      if(answer !==""){
         gameInfo.innerText = `winner player: ${answer}`;
         newGameBtn.classList.add("active");
         return;


      }

      //let's check tie
      let fillCount = 0;
      gameGrid.forEach((box)=>{
         if(box !=="")
            fillCount++
      });

      if(fillCount===9){
         gameInfo.innerText = "Game Tied";
         newGameBtn.classList.add("active");
      }

}

newGameBtn.addEventListener("click",initialize)
