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
                <input type="image" class="delete-board" src="/static/images/delete.png" data-board-id=${board.id} style="width: 3%;" title="Delete"/>  
                <div class="board" data-board-id-title=${board.id} data-board-id=${board.id}>${board.title}</div>
                
                <button class="edit-title-button" data-board-id="${board.id}">Edit Board Title</button>  
                <div class="new-card-input" data-board-id=${board.id}></div>
                <button class="create-card-button" data-board-id="${board.id}">Add New Card</button>               
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
                <button class="add-new-column" data-board-id="${board.id}" hidden>Add new column</button>                               
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card-container" data-card-id=${card.id} draggable="true">
                <div class="card" data-card-id-title="${card.id}" data-card-id="${card.id}">${card.title}</div>
                    <input type="image" class="delete-card" src="/static/images/delete.png" data-card-id=${card.id} style="width: 5%;" title="Delete"/>               
                
                <button class="edit-card-title-button" data-card-id="${card.id}">Edit Card Title</button>                
            </div>`;
}

