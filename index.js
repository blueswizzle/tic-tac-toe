
let boxes = Array.from(document.getElementsByClassName('box'))

let filledBoxes = Array(9).fill("")
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const PLAYER_X = "X";
const PLAYER_O = "O";
let x_score = 0;
let o_score = 0;
let draw_score = 0;
let currentTurn = PLAYER_X;


$('#reset-button').click(reset)

const gameStart = () =>{
    boxes.forEach(box => box.addEventListener('click',boxClicked))
    $('#x-score').text(`X - ${x_score}`)
    $('#o-score').text(`O - ${o_score}`)
    $('#draw-score').text(`Draw - ${draw_score}`)
}
function boxClicked(e){
    const id = e.target.id
    if(gameOver() || gameDraw()){
        return
    }
   
    if(filledBoxes[id] === ""){
        filledBoxes[id] = currentTurn
        e.target.innerText = currentTurn;
        if(gameOver() !==false){
            $('#turn-text').text(`${currentTurn} has Won!`)
            if(currentTurn == PLAYER_X){
                x_score++;
            }else{
                o_score++;
            }
            $('#x-score').text(`X - ${x_score}`)
            $('#o-score').text(`O - ${o_score}`)
            $('#draw-score').text(`Draw - ${draw_score}`)
            let winning_blocks = gameOver()
            winning_blocks.map( box => boxes[box].style.backgroundColor= getComputedStyle(document.body).getPropertyValue('--winning-boxes'))
            return
        }
        if(gameDraw()){
            $('#turn-text').text(`Game Draw! Reset the Board`)
            draw_score++;
            $('#x-score').text(`X - ${x_score}`)
            $('#o-score').text(`O - ${o_score}`)
            $('#draw-score').text(`Draw - ${draw_score}`)
            return;
        }
        currentTurn = currentTurn == PLAYER_X ? PLAYER_O : PLAYER_X
        $('#turn-text').text(`Player ${currentTurn}'s Turn`)
    }else{
        $('#turn-text').text(`Pick another box! Player ${currentTurn}'s Turn`)
    }
}

function reset(){
    filledBoxes.fill("")
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })
    currentTurn = PLAYER_X
    $('#turn-text').text(`Player ${currentTurn}'s Turn`)
}

function gameOver(){
    for(const combo of winningCombinations){
        let [a,b,c] = combo;
        if(filledBoxes[a] && (filledBoxes[a] == filledBoxes[b] && filledBoxes[a] == filledBoxes[c])) {
            return [a,b,c]
        }
    }
    return false
}
function gameDraw(){
    for(let i=0; i < filledBoxes.length; i++){
        if(filledBoxes[i] === ""){
            return false;
        }
    }
    return true;
}

gameStart()