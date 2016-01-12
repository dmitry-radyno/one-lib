export function updatePreBookData(data) {
    return {
        type: "PREBOOK_UPDATE_DATA",
        data: data
    };
}

export function updatePreBookUI(data) {
    return {
        type: "PREBOOK_UPDATE_UI",
        data: data
    };
}