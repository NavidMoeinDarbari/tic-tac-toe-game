const cells = Array.from(document.querySelectorAll('.cell'));
const gameStatus = document.querySelector('.gameStatus');
const gameRestart = document.querySelector('.gameRestart');
const gameRestart2 = document.querySelector('.gameRestart2');

let isActive = true
let currentPlayer = 'X'
let gameState = ['','','','','','','','','','','','','','','',''];
let gameConditions = [
    [0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15],
    [0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15],
    [0,5,10,15],[3,6,9,12]
];

cells.forEach(cell =>{
    cell.addEventListener('click',cellHandler)        
});
gameRestart.addEventListener('click',gameRestartHandler);

function cellHandler(){
    const cellIndex = parseInt(this.dataset.id)
    if(!gameState[cellIndex] && isActive){
        gameState[cellIndex] = currentPlayer
        this.innerText = currentPlayer
        this.classList.add('selected')
        gameResult()
    }
}
function changePlayer(){
    currentPlayer = currentPlayer==='X' ? 'O' : 'X';
    gameStatus.innerText = `It's ${currentPlayer}'s turn` 
}
function gameRestartHandler(){
    currentPlayer = currentPlayer==='X' ? 'O' : 'X';
    gameStatus.innerText = `Does Player ${currentPlayer} want to restart?`   
    gameRestart2.innerText = `${currentPlayer} Restart`
    gameRestart2.classList.toggle('add')
    gameRestart2.addEventListener('click',ev=>{
        cells.forEach(cell=>{
            cell.innerText=''
            cell.classList.remove('selected')
        })
        currentPlayer = 'X'
        gameStatus.innerText = `It's ${currentPlayer}'s Turn`
        gameState = ['','','','','','','','','','','','','','','',''];
        isActive = true
        gameRestart2.classList.remove('add')
        return
    })
}
function gameResult(){
    let isWin = false
    for (const gameCondition of gameConditions) {
        let state0 = gameState[gameCondition[0]]
        let state1 = gameState[gameCondition[1]]
        let state2 = gameState[gameCondition[2]]
        let state3 = gameState[gameCondition[3]]
        if(!state0 || !state1 || !state2 || !state3) continue
        if(state0 === state1 && state1 === state2 && state2 === state3){
            isWin = true
            break
        }
    }
    if(isWin){
        gameStatus.innerText = `Player ${currentPlayer} has won!`
        isActive = false
        return
    }
    if(!gameState.includes('')){
        gameStatus.innerText = `Game ended in a draw!`
        isActive = false
        return
    }
    changePlayer()
}