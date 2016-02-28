export function saveBook() {
    return {
        type: "ADD_BOOK"
    };
};

export function completeSaveBook() {
    window.setTimeout(function() {
        window.location.hash = "/manage";
    }, 1);
    return {
        type: "COMPLETE_ADD_BOOK"
    };
};


export function addBook(filename, book) {
    return dispatch => {
        dispatch(saveBook());
        
        var params = Object.assign({}, book, {
            specs: book.specs.join(", "),
            file: filename
        });

        params = Object.keys(params).map(function(name) {
            return name + "=" + encodeURIComponent(params[name]);
        }).join("&");

        return fetch("./api/book/set?" + params)
            .then(response => response.json())
            .then(json => dispatch(completeSaveBook(json)))
            .catch(() => dispatch(completeSaveBook()));
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

function sortBooks(data) {
    return data.sort(function(bookA, bookB) {
        return bookA.name < bookB.name ? -1 : 1;
    });
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
        
        return fetch("./api/book?query=" + encodeURIComponent(searchValue || ""))
            .then(response => response.json())
            .then(json => sortBooks(json))
            .then(json => dispatch(receiveBooks(json)))
            .catch(() => dispatch(failedRequestingBooks()));
    };
}