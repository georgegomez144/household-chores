const url = 'https://chores-api.e4hp.app/';
const headers = {
    Hash: 'e135a067fc096a19d7eb5ac64efd8bab3ff24017',
    Accept: 'application/json'
}

export const getRequest = path => {
    return fetch(`${url}core/get/${path}`, {
        method: 'GET',
        headers
    });
}

export const postRequest = (path, body) => {
    return fetch(`${url}core/post/${path}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
    });
}

export const putRequest = (path, body) => {
    return fetch(`${url}core/update/${path}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
    });
}

export const deleteRequest = path => {
    return fetch(`${url}core/delete/${path}`, {
        method: 'POST',
        headers
    });
}
