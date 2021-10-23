import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {createElementOnWebsite} from "./boardsManager.js";


export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board-container[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
            domManager.addEventListener(
                `.edit-card-title-button[data-card-id="${card.id}"]`,
                "click",
                editCardTitle
            );


        }
        return cards;
    },
    addNewCard: async function (clickEvent) {
        const boardId = clickEvent.target.dataset.boardId;
        let newCardButton = document.querySelector(`.create-card-button[data-board-id="${boardId}"]`);
        let newCardPlace = document.querySelector(`.new-card-input[data-board-id="${boardId}"]`);
        let showCardsButton = document.querySelector(`.toggle-board-button[data-board-id="${boardId}"]`);

        let inputField = createElementOnWebsite("Input");

        let submitButton = createElementOnWebsite("Submit");
        submitButton.onclick = async function () {
            newCardButton.removeAttribute("hidden");
            submitButton.remove();
            inputField.remove();
            cancelButton.remove();
            let card = await dataHandler.createNewCard(inputField.value, boardId, 1);
            if (showCardsButton.textContent === "Hide Cards") {
                const cardBuilder = htmlFactory(htmlTemplates.card);
                const content = cardBuilder(card);
                await domManager.addChild(`.board-container[data-board-id="${boardId}"]`, content);
            }
        };

        let cancelButton = createElementOnWebsite("Cancel");
        cancelButton.onclick = () => {
            newCardButton.removeAttribute("hidden");
            submitButton.remove();
            inputField.remove();
            cancelButton.remove();
        }

        newCardPlace.appendChild(inputField);
        newCardPlace.appendChild(submitButton);
        newCardPlace.appendChild(cancelButton);

        newCardButton.setAttribute("hidden", "true");
    },

};

function deleteButtonHandler(clickEvent) {
    console.log("aaa");

}

function editCardTitle(clickEvent) {

    const cardId = clickEvent.target.dataset.cardId;
    let editTitleButton = document.querySelector(`.edit-card-title-button[data-card-id="${cardId}"]`);

    editTitleButton.setAttribute("hidden", "true");
    let cardField = document.querySelector(`div[data-card-id-title="${cardId}"]`);

    let cardTitle = document.querySelector(`div[data-card-id-title="${cardId}"]`).textContent;



    let inputField = createElementOnWebsite("Input");
    inputField.value = cardTitle;
    inputField.onkeydown = function (event) {
        if (event.key === "Enter") {
            send();
        } else if (event.key === "Escape") {
            cancel();
        }
    }


    let submitButton = createElementOnWebsite("Submit");
    let send = submitButton.onclick = async function () {
        editTitleButton.removeAttribute("hidden");
        cardField.textContent = inputField.value;
        await dataHandler.changeTitle("cards", cardField.textContent, cardId);
        submitButton.remove();
        inputField.remove();
    };

    let cancelButton = createElementOnWebsite("Cancel");
    let cancel = cancelButton.onclick = () => {
        editTitleButton.removeAttribute("hidden");
        submitButton.remove();
        inputField.remove();
        cancelButton.remove();
        cardField.textContent = cardTitle;
    }

    cardField.textContent = '';
    cardField.appendChild(inputField);
    cardField.appendChild(submitButton);
    cardField.appendChild(cancelButton);



}


