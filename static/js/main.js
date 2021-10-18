import {boardsManager} from "./controller/boardsManager.js";

function init() {
    boardsManager.loadBoards();
    initAddNewBoard();



}

init();

function initAddNewBoard() {
    let boardButton = document.getElementById("new-board");
    boardButton.addEventListener("click", boardsManager.showNewBoardTitleInput);
    let okButton = document.getElementById("new-board-ok");
    okButton.addEventListener("click", boardsManager.addNewBoard);
}






