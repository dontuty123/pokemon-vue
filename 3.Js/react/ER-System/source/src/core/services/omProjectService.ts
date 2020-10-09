import {getApi, postApi} from '../../core/services';

export const getOmProject = (data: string) => {
    return getApi('omproject-list', data);
};

export const createOmProject = (data: string) => {
    return postApi("omproject-create", data);
};

export const updateOmProject = (data: string) => {
    return postApi("omproject-update", data);
};

export const delOmProject = (data: any) => {
    return postApi("omproject-delete", data);
};
