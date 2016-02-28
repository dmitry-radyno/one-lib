function requestBook(id) {
    return {
        type: "REQUEST_BOOK",
        id: id
    };
}

function receiveBook(book) {
    return {
        type: "RECEIVE_BOOK",
        book: book[0]
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
        
        return fetch("./api/book/get?id=" + encodeURIComponent(id))
            .then(response => response.json())
            .then(json => dispatch(receiveBook(json)))
            .catch(() => dispatch(failedReceivingBook()));
    };
}

export function updateBookUI(data) {
    return {
        type: "UPDATE_BOOK_UI",
        data: data
    };
}

export function addDownloadPage(page) {
    return {
        type: "ADD_DOWNLOAD_PAGE",
        data: page
    };
}

export function removeDownloadPage(page) {
    return {
        type: "REMOVE_DOWNLOAD_PAGE",
        data: page
    };
}

export function showMessage(message) {
    return {
        type: "SHOW_MESSAGE",
        data: message
    };
}

export function clearBookPage() {
    return {
        type: "CLEAR_BOOK_STATE"
    };
}