export function addEntity(id, name) {
    return {
        type: "ADD_ENTITY",
        id: id,
        name: name
    };
}

export function removeEntity(id) {
    return {
        type: "REMOVE_ENTITY",
        id: id
    };
}

function requestEntities() {
    return {
        type: "REQUEST_ENTITIES"
    };
}

function receiveEntities(posts) {
    return {
        type: "RECEIVE_ENTITIES",
        posts: posts
    };
}

function failedRequestingEntities() {
    return {
        type: "FAILED_REQUESTING_ENTITIES"
    }
}

export function fetchEntities() {
    return dispatch => {
        dispatch(requestEntities());

        return fetch("/data")
            .then(response => response.json())
            .catch(() => dispatch(failedRequestingEntities()))
            .then(json => dispatch(receiveEntities(json)));
    };
}