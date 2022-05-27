import {deleteRequest, getRequest, postRequest, putRequest} from "./index";

export const getChore = id => {
    return getRequest(`chore/id/${id}`);
}

export const getChores = () => {
    return getRequest(`chores`);
}

export const saveNewChore = data => {
    return postRequest(`newChore`, data);
}

export const editChore = (id, data) => {
    return putRequest(`editChore/id/${id}`, data);
}

export const deleteChore = id => {
    return deleteRequest(`deleteChore/id/${id}`);
}

export const saveNewChoreStatus = data => {
    return postRequest(`newChoreStatus`, data);
}

export const editChoreStatus = (id, data) => {
    return putRequest(`editChoreStatus/id/${id}`, data);
}

export const deleteChoreStatus = id => {
    return deleteRequest(`deleteChoreStatus/id/${id}`);
}
