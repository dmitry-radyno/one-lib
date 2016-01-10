const initialState = {
    fetching: false,
    data: []
};

let requestPreBooks = function(state, action) {
        return Object.assign({}, state, {
            fetching: true,
            data: []
        });
    },
    receivePreBooks = function(state, action) {
        return Object.assign({}, state, {
            fetching: false,
            data: action.data
        });
    },
    failedRequestingPreBooks = function(state, action) {
        return Object.assign({}, state, {
            fetching: false,
            data: []
        });
    };

export function prebooks(state = initialState, action) {
    switch (action.type) {
        case 'REQUEST_PREBOOKS':
            return requestPreBooks(state, action);
        case 'RECEIVE_PREBOOKS':
            return receivePreBooks(state, action);
        case 'FAILED_REQUESTING_PREBOOKS':
            return failedRequestingPreBooks(state, action);
        default:
            return state;
    }
}