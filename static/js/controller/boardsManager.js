import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
export {createElementOnWebsite};

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
            domManager.addEventListener(
                `.edit-title-button[data-board-id="${board.id}"]`,
                "click",
                boardsManager.editBoardTitle
            );
            domManager.addEventListener(
                `.create-card-button[data-board-id="${board.id}"]`,
                "click",
                cardsManager.addNewCard
            );
        }
    },
    showNewBoardTitleInput: function () {
        document.getElementById("new-board").setAttribute("hidden", "true");
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

    },
    editBoardTitle(clickEvent) {
        const boardId = clickEvent.target.dataset.boardId;
        console.log(boardId)
        let boardTitle = document.querySelector(`div[data-board-id-title="${boardId}"]`).textContent;
        let boardField = document.querySelector(`div[data-board-id-title="${boardId}"]`);
        let editTitleButton = document.querySelector(`.edit-title-button[data-board-id="${boardId}"]`);

        let inputField = createElementOnWebsite("Input");
        inputField.value = boardTitle;

        let submitButton = createElementOnWebsite("Submit");
        submitButton.onclick = async function () {
            editTitleButton.removeAttribute("hidden");
            boardField.textContent = inputField.value;
            await dataHandler.changeTitle("boards", boardField.textContent, boardId); //tu moze byc blad bo zmieniłem boardfield.textcontent
            submitButton.remove();
            inputField.remove();
        };

        let cancelButton = createElementOnWebsite("Cancel");
        cancelButton.onclick = () => {
            editTitleButton.removeAttribute("hidden");
            submitButton.remove();
            inputField.remove();
            cancelButton.remove();
            boardField.textContent = boardTitle;
        }

        boardField.textContent = '';
        boardField.appendChild(inputField);
        boardField.appendChild(submitButton);
        boardField.appendChild(cancelButton);

        editTitleButton.setAttribute("hidden", "true");

    }


};

async function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    let takeButton = document.querySelector(`.toggle-board-button[data-board-id="${boardId}"]`);
    let board = document.querySelector(`div[data-board-id="${boardId}"]`);

    if (takeButton.textContent === "Show Cards") {
        await cardsManager.loadCards(boardId);
        takeButton.textContent = "Hide Cards";
    } else if (takeButton.textContent === "Hide Cards") {
        board.querySelectorAll(".card").forEach(el => el.remove());
        board.querySelectorAll(".edit-card-title-button").forEach(el => el.remove());
        takeButton.textContent = "Show Cards";
        }
}

function createElementOnWebsite(type) {
    if (type === "Submit" || type === "Cancel") {
        let button = document.createElement("button");
        button.textContent = type;
        button.className = 'btn';
        return button;
    } else if (type === "Input") {
        let inputField = document.createElement("input");
        inputField.type = 'text';
        inputField.className = "inp"
        return inputField;
    }
}

// CO ROBI clickevent
