import {
    getRequest, postRequest, putRequest, deleteRequest
} from './index'
import moment from "moment";

export const getMember = id => {
    return getRequest(`member/id/${id}`);
}

export const getMembers = () => {
    return getRequest(`members`);
}

export const getMembersWithChoresToday = () => {
    const today = moment().format('dddd').toLowerCase();
    return getRequest(`members/filter/is/day/${today}`);
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
