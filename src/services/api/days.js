import {deleteRequest, getRequest, postRequest, putRequest} from "./index";

export const getDay = id => {
    return getRequest(`day/id/${id}`);
}

export const getDays = () => {
    return getRequest(`days`);
}

export const saveNewMemberChoreDay = data => {
    return postRequest(`newMemberChoreDay`, data);
}

export const editNewMemberChoreDay = (id, data) => {
    return putRequest(`editMemberChoreDay/id/${id}`, data);
}

export const deleteMemberChoreDay = id => {
    return deleteRequest(`deleteMemberChoreDay/id/${id}`);
}
