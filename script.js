let tile = document.querySelectorAll(".Tile");
let turn = "X";
let isGameOver = false;
let winningStates=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ]
tile.forEach(chance=>{
    chance.innerHTML="";
    chance.addEventListener("click",()=>{
        if(!isGameOver && chance.innerHTML==""){
            chance.innerHTML=turn;
            checkWin();
            checkDraw();
            if(!isGameOver)
            {
            changeTurn();
            computerTurn();
        }
    }
    })
})


function changeTurn(){
    if(turn=== "X"){
        turn = "O";
       
    }
    else{
        turn ="X";
    }
}


function computerTurn(){
    let emptyTiles = [];
    tile.forEach(chance=>{
        if(chance.innerHTML === ""){
            emptyTiles.push(chance);
        }
    })
    if (emptyTiles.length===0) {
        isGameOver=true;
        document.querySelector(".result").innerHTML = "Draw";
        return;
    }
    let randomIndex;
    let winningIndex=11;
    for (let i=0; i<winningStates.length;i++) 
    {
        let valueOne=tile[winningStates[i][0]].innerHTML;
        let valueTwo=tile[winningStates[i][1]].innerHTML;
        let valueThree=tile[winningStates[i][2]].innerHTML;
        if(valueOne==="X" && valueTwo==="X" && valueThree ==="") {
            winningIndex = winningStates[i][2];
            break;
        }
        else if(valueOne==="X" && valueTwo==="" && valueThree==="X") 
        {
            winningIndex = winningStates[i][1];
            break;
        }
        else if(valueOne==="" && valueTwo==="X" && valueThree==="X") {
            winningIndex = winningStates[i][0];
            break;
        }
    }
    if (winningIndex===11) {
        if(emptyTiles.length==8 && tile[4].innerHTML=="")
        {
            emptyTiles[3].innerHTML = "O";
        }
        else{
        randomIndex = Math.floor(Math.random()*emptyTiles.length);
        emptyTiles[randomIndex].innerHTML = "O";
        }
    }
   
    else {
        tile[winningIndex].innerHTML = "O";
    }
    
    turn="X";
    checkWin();
    checkDraw();
}




function checkWin(){
    
    for(let i=0;i<winningStates.length;i++)
    {

        let valueOne= tile[winningStates[i][0]].innerHTML;
        let valueTwo= tile[winningStates[i][1]].innerHTML;
        let valueThree= tile[winningStates[i][2]].innerHTML;
        if(valueOne===valueTwo && valueTwo===valueThree && valueOne!="")
        {
            isGameOver=true;
            if(valueOne === "X"){
                document.querySelector(".result").innerHTML="player wins!";
            } else {
                document.querySelector(".result").innerHTML="Computer wins!";
            }
        }
    }

}


function checkDraw(){
    if(!isGameOver)
    {
        let isDraw=true;
        tile.forEach(chance=>{
            if(chance.innerHTML==="")
            isDraw=false;
        })
        if(isDraw)
        {
            isGameOver=true;
            document.querySelector(".result").innerHTML="Draw";
        }
    }
}

