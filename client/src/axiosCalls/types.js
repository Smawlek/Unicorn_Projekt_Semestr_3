import Axios from 'axios';
import { ReactSession } from 'react-client-session';

import { _SERVER_BASE_URL } from '../helpers/const';

ReactSession.setStoreType("localStorage");
const token = ReactSession.get("tokenProject");
const user = ReactSession.get("userProject");

export const _listTypesOfAssigments = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/types/list", {
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

export const _createTypeOfAssigment = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/types/create', 
        {
            name: data.name
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

export const _deleteTypeOfAssigment = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/types/delete', 
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

export const _getTypeOfAssigment = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/types/get', 
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