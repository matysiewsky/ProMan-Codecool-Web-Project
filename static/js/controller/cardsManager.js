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

        }
        return cards;
    },
    addNewCard: async function (clickEvent) {
        const boardId = clickEvent.target.dataset.boardId;
        let newCardButton = document.querySelector(`.create-card-button[data-board-id="${boardId}"]`);
        let newCardPlace = document.querySelector(`.new-card-input[data-board-id="${boardId}"]`);

        let inputField = createElementOnWebsite("Input");

        let submitButton = createElementOnWebsite("Submit");
        submitButton.onclick = async function () {
            newCardButton.removeAttribute("hidden");
            submitButton.remove();
            inputField.remove();
            cancelButton.remove();
            let card = await dataHandler.createNewCard(inputField.value, boardId, 1);
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            await domManager.addChild(`.board-container[data-board-id="${boardId}"]`, content);

            // Dodac do diva na koncu? ale najpierw stworzyc nowa karte
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



    }
};

function deleteButtonHandler(clickEvent) {
    console.log("aaa");
}


