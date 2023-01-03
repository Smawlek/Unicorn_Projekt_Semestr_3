import Axios from 'axios';
import { ReactSession } from 'react-client-session';

import { _SERVER_BASE_URL } from '../helpers/const';

ReactSession.setStoreType("localStorage");
const token = ReactSession.get("tokenProject");
const user = ReactSession.get("userProject");

export const _createRating = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/ratings/create', 
        {
            assigment: Number(data.assigment),
            sturu_id: Number(data.sturu_id),
            points: Number(data.points),
            description: data.description
        },
        {
            headers: {
                token: token
            } 
        });
    } catch (error) {
        throw new Error(error)
    }
}

export const _updateRating = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/ratings/update', 
        {
            id: Number(data.id),
            assigment: Number(data.assigment),
            points: Number(data.points),
            description: data.description
        },
        {
            headers: {
                token: token
            } 
        });
    } catch (error) {
        throw new Error(error)
    }
}

export const _deleteRating = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/ratings/delete', 
        {
            id: Number(data.id),
        },
        {
            headers: {
                token: token
            } 
        });
    } catch (error) {
        throw new Error(error)
    }
}

export const _getRating = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/ratings/get", {
            headers: {
                token: token
            },
            params: {
                id: Number(data.id)
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}

export const _listRatings = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/ratings/list", {
            headers: {
                token: token
            },
            params: {
                // Bez parametrů
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}

export const _getRatingForStudent = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/ratings/get-for-student", {
            headers: {
                token: token
            },
            params: {
                id: Number(data.id),
                assigment: Number(data.assigment),
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}

export const _alterRatings = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/ratings/alter', 
        {
            data: data
        },
        {
            headers: {
                token: token
            } 
        });
    } catch (error) {
        throw new Error(error)
    }
}