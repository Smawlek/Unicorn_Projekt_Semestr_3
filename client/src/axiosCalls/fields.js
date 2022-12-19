import Axios from 'axios';
import { ReactSession } from 'react-client-session';

import { _SERVER_BASE_URL } from '../helpers/const';

ReactSession.setStoreType("localStorage");
const token = ReactSession.get("token");
const user = ReactSession.get("user");

export const _createField = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/fields/create', 
        {
            name: data.name,
            short: data.short,
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

export const _updateField = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/fields/update', 
        {
            id: Number(data.id),
            name: data.name,
            short: data.short,
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

export const _listFields = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/fields/list", {
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

export const _getField = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/fields/get", {
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