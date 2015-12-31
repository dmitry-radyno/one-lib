const initialState = {
    entities: {
        fetching: false,
        data: []
    }
};

let addEntity = function(state, action) {
        return Object.assign({}, state, {
            entities: {
                data: [
                    ...state.entities,
                    { id: action.id, name: action.name }
                ]
            }
        });
    },
    removeEntity = function(state, action) {
        let id = action.id,
            index = state.entities.map((item) => item.id).indexOf(1*id);

        if (index > -1) {
            return Object.assign({}, state, {
                data: {
                    entities: [
                        ...state.entities.data.slice(0, index),
                        ...state.entities.data.slice(index + 1)
                    ]
                }
            });
        } else {
            throw Error("Removing unknown item - something wrong in UI");
        }
    },
    requestEntities = function(state, action) {
        return Object.assign({}, state, {
            entities: {
                isFetching: true,
                data: state.entities.data
            }
        });
    },
    receiveEntities = function(state, action) {
        return Object.assign({}, state, {
            entities: {
                isFetching: false,
                data: action.posts
            }
        });
    },
    failedRequestingEntities = function(state, action) {
        debugger;
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
            return addEntity(state, action);
        case 'REMOVE_ENTITY':
            return removeEntity(state, action);
        case 'REQUEST_ENTITIES':
            return requestEntities(state, action);
        case 'RECEIVE_ENTITIES':
            return receiveEntities(state, action);
        case 'FAILED_REQUESTING_ENTITIES':
            return failedRequestingEntities(state, action);
        default:
            return state;
    }
}