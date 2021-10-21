export const htmlTemplates = {
    board: 1,
    card: 2
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        default:
            console.error("Undefined template: " + template)
            return () => {
                return ""
            }
    }
}

function boardBuilder(board) {
    return `<div class="board-container" data-board-id=${board.id}>
                <div class="board" data-board-id-title=${board.id} data-board-id=${board.id}>${board.title}</div>
                    <div class="new-card-input" data-board-id=${board.id}>
                        <button class="create-card-button" data-board-id="${board.id}">Add New Card</button> 
                    </div>
                <button class="edit-title-button" data-board-id="${board.id}">Edit Board Title</button>                
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
                               
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card-container" data-card-id=${card.id}>
                <div class="card inline" data-card-id-title="${card.id}" data-card-id="${card.id}">${card.title}</div>
                <button class="edit-card-title-button inline" data-card-id="${card.id}">Edit Card Title</button>
            </div>`;
}

