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
            isFetching: true,
            data: state.data
        });
    },
    receiveBooks = function(state, action) {
        return Object.assign({}, state, {
            isFetching: false,
            data: action.posts
        });
    },
    failedRequestingBooks = function(state, action) {
        return Object.assign({}, state, {
            entities: {
                isFetching: false,
                data: state.entities.data
            }
        });
    };

export function entities(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ENTITY':
            return addBook(state, action);
        case 'REMOVE_ENTITY':
            return removeBook(state, action);
        case 'REQUEST_ENTITIES':
            return requestBooks(state, action);
        case 'RECEIVE_ENTITIES':
            return receiveBooks(state, action);
        case 'FAILED_REQUESTING_ENTITIES':
            return failedRequestingBooks(state, action);
        default:
            return state;
    }
}