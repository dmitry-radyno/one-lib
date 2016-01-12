import { combineReducers } from 'redux';

const initialState = {
    fetching: false,
    books: []
};

let fetching = function(state = initialState.fetching, action) {
        switch (action.type) {
            case 'REQUEST_BOOKS':
                return true;
            case 'RECEIVE_BOOKS':
                return false;
            case 'FAILED_REQUESTING_BOOKS':
                return false;
            default:
                return state;
        }
    },
    addBook = function(state, action) {
        return [...state, action.data];
    },
    removeBook = function(state, action) {
        return state.filter(function(book) {
            return book.id === action.id;
        });
    },
    requestBooks = function(state, action) {
        return [];
    },
    receiveBooks = function(state, action) {
        return [...action.data];
    },
    failedRequestingBooks = function(state, action) {
        return [];
    },
    books = function(state = initialState.books, action) {
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
    };

export default combineReducers({ fetching, books });