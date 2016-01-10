export function addBook(id, name) {
    return {
        type: "ADD_BOOK",
        id: id,
        name: name
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

function receiveBooks(posts) {
    return {
        type: "RECEIVE_BOOKS",
        posts: posts
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