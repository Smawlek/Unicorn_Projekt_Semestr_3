import Axios from 'axios';
import { ReactSession } from 'react-client-session';

import { _SERVER_BASE_URL } from '../helpers/const';

ReactSession.setStoreType("localStorage");
const token = ReactSession.get("token");
const user = ReactSession.get("user");

export const _createSubject = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/subjects/create', 
        {
            creator: Number(user.id),
            name: data.name,
            description: data.description,
            field: Number(data.field),
            howManyWeeks: Number(data.howManyWeeks),
            weekDescription: data.weekDescription.toString(),
            teacher: Number(data.teacher),
            active: Number(data.active),
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

export const _listSubjects = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/subjects/list", {
            headers: {
                token: token
            },
            params: {
                // Bez parametrů
            }
        });
    } catch (error) {
        //throw new Error(error);
    }
}

export const _updateSubject = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/subjects/update', 
        {
            id: Number(data.id),
            name: data.name,
            description: data.description,
            field: Number(data.field),
            howManyWeeks: Number(data.howManyWeeks),
            weekDescription: data.weekDescription.toString(),
            teacher: Number(data.teacher),
            active: Number(data.active),
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

export const _getSubject = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/subjects/get", {
            headers: {
                token: token
            },
            params: {
                id: Number(data.id),
            }
        });
    } catch (error) {
        //throw new Error(error);
    }
}