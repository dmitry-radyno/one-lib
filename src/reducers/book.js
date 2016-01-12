const initialState = {
    book: null,
    fetching: false,
    page: 1,
    scale: 1.7
};

let requestBook = function(state, action) {
        return Object.assign({}, state, {
            fetching: true,
            book: null
        });
    },
    receiveBook = function(state, action) {
        return Object.assign({}, state, {
            fetching: false,
            book: action.book
        });
    },
    failedRequestingBook = function(state, action) {
        return Object.assign({}, state, {
            fetching: false,
            book: null,
            error: action.error
        });
    },
    updateBookUI = function(state, action) {
        return Object.assign({}, state, action.data);
    };

export function book(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_BOOK_UI':
            return updateBookUI(state, action);
        case 'REQUEST_BOOK':
            return requestBook(state, action);
        case 'RECEIVE_BOOK':
            return receiveBook(state, action);
        case 'FAILED_REQUESTING_BOOK':
            return failedRequestingBook(state, action);
        default:
            return state;
    }
}