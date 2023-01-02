import Axios from 'axios';
import { ReactSession } from 'react-client-session';

import { _SERVER_BASE_URL } from '../helpers/const';

ReactSession.setStoreType("localStorage");
const token = ReactSession.get("tokenProject");
const user = ReactSession.get("userProject");

export const _createAssigment = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/assigments/create', 
        {
            author: user.id,
            subject: Number(data.subject),
            type: Number(data.type),
            name: data.name,
            description: data.description,
            maxPoints: data.maxPoints,
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

export const _updateAssigment = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/assigments/update', 
        {
            id: Number(data.id),
            subject: Number(data.subject),
            type: Number(data.type),
            name: data.name,
            description: data.description,
            maxPoints: data.maxPoints,
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

export const _getAssigment = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/assigments/get", {
            headers: {
                token: token
            },
            params: {
                id: Number(data.id),
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}

export const _listAssigments = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/assigments/list", {
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

export const _getAssigmentBySubject = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/assigments/get-by-subject", {
            headers: {
                token: token
            },
            params: {
                id: Number(data.id),
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}