export function addBook(book) {
    return {
        type: "ADD_BOOK",
        data: book
    };
}

export function removeBook(id) {
    return {
        type: "REMOVE_BOOK",
        id: id
    };
}

function requestBooks() {
    return {
        type: "REQUEST_BOOKS"
    };
}

function receiveBooks(data) {
    return {
        type: "RECEIVE_BOOKS",
        data: data
    };
}

function failedRequestingBooks() {
    return {
        type: "FAILED_REQUESTING_BOOKS"
    }
}

export function fetchBooks(searchValue) {
    return dispatch => {
        dispatch(requestBooks(searchValue));
        
        return fetch("/data?query=" + encodeURIComponent(searchValue || ""))
            .then(response => response.json())
            .then(json => dispatch(receiveBooks(json)))
            .catch(() => dispatch(failedRequestingBooks()));
    };
}