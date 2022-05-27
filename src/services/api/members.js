import {
    getRequest, postRequest, putRequest, deleteRequest
} from './index'

export const getMember = id => {
    return getRequest(`member/id/${id}`);
}

export const getMembers = () => {
    return getRequest(`members`);
}

export const saveNewMember = data => {
    return postRequest('newMember', data);
}

export const editMember = (id, data) => {
    return putRequest(`member/id/${id}`, data);
}

export const deleteMember = id => {
    return deleteRequest(`member/id/${id}`);
}
