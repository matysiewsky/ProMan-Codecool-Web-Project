export let dataHandler = {
    getBoards: async function () {
        const response = await apiGet("/api/boards");
        return response;
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
        const response = await apiGet(`/api/boards/${boardId}`);
        return response;
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        const response = await apiGet(`/api/boards/${boardId}/cards/`);
        return response;
    },
    getCard: async function (cardId) {
        const response = await apiGet(`/api/boards/${cardId}`);
        return response;
    },
    createNewBoard: async function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
        const response = await apiPost("/api/boards", {boardTitle: boardTitle});
        return response;
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
        const response = await apiPost(`/api/boards/${boardId}/new_card/`, {cardTitle: cardTitle}, {statusId: statusId});
        return response;
    },
    changeTitle: async function (card_or_board, title, id) {
        const response = await apiPost(`/api/${id}/${card_or_board}-title`, {title: title, type: card_or_board});
        return response;
    },
    deleteCard: async function (cardId, boardId) {
        const response = await apiDelete(`/api/${boardId}/${cardId}`);
        return response;
    },
    deleteBoard: async function (boardId) {
        const response = await apiDelete(`/api/${boardId}`);
        return response;
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.status === 200) {
        let data = response.json();
        return data;
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    if (response.status === 200) {
        let data = response.json();
        return data;
    }


}

async function apiDelete(url) {
    await fetch(url, {
        method: "DELETE",
        dataType: "json"
    });
}

async function apiPut(url) {
}
