function requestPreBooks() {
    return {
        type: "REQUEST_PREBOOKS"
    };
}

function receivePreBooks(prebooks) {
    return {
        type: "RECEIVE_PREBOOKS",
        data: prebooks
    };
}

function failedRequestingPreBooks() {
    return {
        type: "FAILED_REQUESTING_PREBOOKS"
    }
}

export function fetchPreBooks() {
    return dispatch => {
        dispatch(requestPreBooks());

        return fetch("/prebooks")
            .then(response => response.json())
            .then(json => dispatch(receivePreBooks(json)))
            .catch(() => dispatch(failedRequestingPreBooks()));
    };
}