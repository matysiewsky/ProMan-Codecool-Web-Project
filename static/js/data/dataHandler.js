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
        // the card is retrieved and then the callback function is called with the card
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
    changeBoardTitle: async function (boardTitle, boardId) {
        const response = await apiPost(`/api/boards/${boardId}/title`, {boardTitle: boardTitle}, {boardId: boardId});
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
        method: "DELETE"
    });
}

async function apiPut(url) {
}
