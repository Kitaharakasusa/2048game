let board = new Array();
let score = 0;
let hasConflicted = new Array();

$(document).ready(function () {
   newgame(); 
});

function newgame() {
     //初始化棋盘格
    init();
    //在随机两个格子生成两个数字
    generateOneNumber();
    generateOneNumber();

}
function init() {
    for (let i = 0; i < 4; i++) 
        for (let j = 0; j<4; j++){
            let gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i,j));

        }

    for (let i = 0; i < 4;i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(let j =0; j< 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    updateBoardView();
}
function updateBoardView() {
    $(".number-cell").remove();
    for (let i = 0; i<4; i++)
        for(let j = 0; j < 4; j++) {
            $("#grid-container").append(`<div class="number-cell" id="number-cell-${i}-${j}"></div>`);

            let theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board [i][j] === 0) {
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + 50);
                theNumberCell.css('left',getPosLeft(i,j) + 50);

            } else {
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));

                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);

            }
            hasConflicted[i][j] = false;
        }

}
function generateOneNumber() {
    if(nospace(board))
        return false;
    //random position
    let randx = parseInt(Math.floor(Math.random() *4));
    let randy = parseInt(Math.floor(Math.random() *4));

    let times = 0;
    while(times <50){
        if(board[randx][randy] ===0)
            break;
        randx = parseInt(Math.floor(Math.random() *4));
        randy = parseInt(Math.floor(Math.random() *4));

        times++;
    }
    if (times === 50 ) {
        for (let i = 0; i< 4;i++) {
            for(let j =0; j<4;j++) {
                if (board[i][j] === 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    //random number
    let randNumber = Math. random()<0.5 ? 2:4;

    //display random number
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy, randNumber);

    return true;
    
}

$(document).keydown(function (event) {
   switch (event.keyCode) {
       case 37:
           if(moveLeft()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isGameOver()",300);
           }
           break;
       case 38:
           if(moveUp()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isGameOver()",300);
           }
           break;
       case 39:
           if(moveRight()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isGameOver()",300);
           }
           break;
       case 40:
           if(moveDown()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isGameOver()",300);
           }
           break;
       default:
           break;
   } 
});

function moveLeft() {
    console.log('22222');
    if(!canMoveLeft(board))return false;
    for (let i = 0; i<4; i++){
        for(let j = 1; j<4; j++) {
            if (board[i][j]!==0) {
                for (let k = 0; k<j; k++) {
                    if(board[i][k]===0 && noBlockHorizontal(i,k,j,board)) {
                        // move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0 ;
                        continue;
                    }
                    else if (board[i][k]=== board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k])  {
                        showMoveAnimation(i,j,i,k);

                        board[i][k]+= board[i][j];
                        board[i][j] =0;
                        score+= board[i][k];

                        hasConflicted[i][k] = true;
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveRight() {
    if(!canMoveRight(board))return false;
    for (let i = 0; i<4; i++){
        for(let j = 2; j>=0; j--) {
            if (board[i][j]!==0) {
                for (let k = 3; k>j; k--) {
                    if(board[i][k]===0 &&  noBlockHorizontal (i,j,k,board)) {
                        // move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0 ;
                        continue;
                    }
                    else if (board[i][k]=== board[i][j] && noBlockHorizontal(i,j,k,board) &&!hasConflicted[i][k])  {
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+= board[i][k];
                        board[i][j] =0;
                        score+=board[i][k];

                        hasConflicted[i][k] = true;
                        updateScore(score);

                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveUp() {
    if(!canMoveUp(board))return false;
    for (let j = 0; j<4; j++){
        for(let i = 1; i<4; i++) {
            if (board[i][j]!==0) {
                for (let k = 0; k<i; k++) {
                if(board[k][j]===0 &&   noBlockVertical(j,k,i,board)) {
                        // move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0 ;
                        continue;
                    }
                    else if (board[k][j]=== board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j])  {
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+= board[k][j];
                        board[i][j] =0;
                        score += board[k][j];

                        hasConflicted[k][j] = true;
                        updateScore(score);

                    continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveDown() {
    if(!canMoveDwon(board))return false;
    for (let j = 0; j<4; j++){
        for(let i = 2; i>=0; i--) {
            if (board[i][j]!==0) {
                for (let k = 3; k>i; k--) {
                    if(board[k][j]===0 &&   noBlockVertical(j,i,k,board)) {
                        // move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0 ;
                        continue;
                    }
                    else if (board[k][j]=== board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j])  {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[k][j];
                        board[i][j] =0;
                        score += board[k][j];

                        hasConflicted[k][j] =true;
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function isGameOver() {
    if (nospace(board) && nomove(board)){
      gameOver();
    }
}

function gameOver() {
    alert('game over');
}