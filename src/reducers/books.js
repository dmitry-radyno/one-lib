const initialState = {
    fetching: false,
    data: []
};

let addBook = function(state, action) {
        return Object.assign({}, state, {
            data: [
                ...state.data,
                { id: action.id, name: action.name }
            ]
        });
    },
    removeBook = function(state, action) {
        let id = action.id,
            index = state.data.map((item) => item.id).indexOf(1*id);

        if (index > -1) {
            return Object.assign({}, state, {
                data: [
                    ...state.entities.data.slice(0, index),
                    ...state.entities.data.slice(index + 1)
                ]
            });
        } else {
            throw Error("Removing unknown item - something wrong in UI");
        }
    },
    requestBooks = function(state, action) {
        return Object.assign({}, state, {
            fetching: true,
            data: state.data
        });
    },
    receiveBooks = function(state, action) {
        return Object.assign({}, state, {
            fetching: false,
            data: action.posts
        });
    },
    failedRequestingBooks = function(state, action) {
        return Object.assign({}, state, {
            fetching: false,
            data: state.entities.data
        });
    };

export function books(state = initialState, action) {
    switch (action.type) {
        case 'ADD_BOOK':
            return addBook(state, action);
        case 'REMOVE_BOOK':
            return removeBook(state, action);
        case 'REQUEST_BOOKS':
            return requestBooks(state, action);
        case 'RECEIVE_BOOKS':
            return receiveBooks(state, action);
        case 'FAILED_REQUESTING_BOOKS':
            return failedRequestingBooks(state, action);
        default:
            return state;
    }
}