const initialState = {
    book: null,
    fetching: false,
    page: 1,
    scale: 1.7,
    downloadPages: [],
    message: ""
};

var reducers = {
    'UPDATE_BOOK_UI': function(state, action) {
        return Object.assign({}, state, action.data);
    },
    'REQUEST_BOOK': function(state, action) {
        return Object.assign({}, state, {
            fetching: true,
            book: null
        });
    },
    'RECEIVE_BOOK': function(state, action) {
        return Object.assign({}, state, {
            fetching: false,
            book: action.book
        });
    },
    'FAILED_REQUESTING_BOOK': function(state, action) {
        return Object.assign({}, state, {
            fetching: false,
            book: null,
            error: action.error
        });
    },
    'ADD_DOWNLOAD_PAGE': function(state, action) {
        return Object.assign({}, state, {
            downloadPages: state.downloadPages.concat([action.data])
        });
    },
    'REMOVE_DOWNLOAD_PAGE': function(state, action) {
        return Object.assign({}, state, {
            downloadPages: state.downloadPages.filter(function(candidate) {
                return candidate !== action.data;
            })
        });
    },
    'SHOW_MESSAGE': function(state, action) {
        return Object.assign({}, state, {
            message: action.data
        });
    },
    'CLEAR_BOOK_STATE': function(state, action) {
        return Object.assign({}, state, {
            page: 1,
            scale: 1.7,
            downloadPages: [],
            message: ""
        });
    }
};


export function book(state = initialState, action) {
    if (reducers.hasOwnProperty(action.type)) {
        return reducers[action.type](state, action);
    }/* else {
        if (action.type.indexOf("@@redux") !== 0 && action.type.indexOf("@@router") !== 0) {
            throw Error("Unknown action type: " + action.type);
        }
    }*/
    return state;
}