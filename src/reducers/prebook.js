import { combineReducers } from 'redux';

const initialState = {
    data: {
        type: "book",
        name: "",
        author: "",
        year: "",
        keywords: "",
        specs: [],
    },
    ui: {
        page: 1,
        scale: 1.2,
    },
};


let updateData = function(state, action) {
        return Object.assign({}, state, action.data);
    },
    data = function(state = initialState.data, action) {
        switch (action.type) {
            case 'PREBOOK_UPDATE_DATA':
                return updateData(state, action);
            case 'COMPLETE_ADD_BOOK':
                return initialState.data;
            default:
                return state;
        }
    },

    updateUI = function(state, action) {
        return Object.assign({}, state, action.data);
    },
    ui = function(state = initialState.ui, action) {
        switch (action.type) {
            case 'PREBOOK_UPDATE_UI':
                return updateUI(state, action);
            case 'COMPLETE_ADD_BOOK':
                return initialState.ui;
            default:
                return state;
        }
    };

export default combineReducers({ data, ui });