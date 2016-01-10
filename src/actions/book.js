function requestBook(id) {
    return {
        type: "REQUEST_BOOK",
        id: id
    };
}

function receiveBook(book) {
    return {
        type: "RECEIVE_BOOK",
        book: book
    }
}

function failedReceivingBook() {
    return {
        type: "FAILED_REQUESTING_BOOK"
    };
}

export function fetchBook(id) {
    return dispatch => {
        dispatch(requestBook(id));
        
        return fetch("/book/id")
            .then(response => response.json())
            .then(json => dispatch(receiveBook(json)))
            .catch(() => dispatch(failedReceivingBook()));
    };
}