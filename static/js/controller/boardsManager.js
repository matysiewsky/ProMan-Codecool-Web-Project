import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
    },
    showAddNewBoard: async function () {
        document.getElementById("new-board").hidden = true;
        document.getElementById("new-board-input").hidden = false;
        document.getElementById("new-board-ok").hidden = false;
    },
    addNewBoard: async function () {
        let boardTitle = document.getElementById("new-board-input");
         let board = await dataHandler.createNewBoard(boardTitle.value);
        document.getElementById("new-board").hidden = false;
        document.getElementById("new-board-input").hidden = true;
        document.getElementById("new-board-ok").hidden = true;
        const boardBuilder = htmlFactory(htmlTemplates.board);
        const content = boardBuilder(board);
        domManager.addChild("#root", content);
        domManager.addEventListener(
            `.toggle-board-button[data-board-id="${board.id}"]`,
            "click",
            showHideButtonHandler
        );

    }
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}


