import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
    },
    removeCards: async function (className) {
        const elements = await document.getElementsByClassName(className);
        console.log((elements))
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
};

function deleteButtonHandler(clickEvent) {
    console.log("aaa");
}
