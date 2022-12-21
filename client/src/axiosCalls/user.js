import Axios from 'axios';
import { ReactSession } from 'react-client-session';

import { _SERVER_BASE_URL } from '../helpers/const';

ReactSession.setStoreType("localStorage");
const token = ReactSession.get("tokenProject");
const user = ReactSession.get("userProject");

export const _loginUser = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/user/login", {
            headers: {
            },
            params: {
                email: data.email,
                password: data.password
            }
        });
    } catch (error) {
        //throw new Error(error);
    }
}

export const _listUsers = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/user/list", {
            headers: {
                token: token
            },
            params: {
                role: Number(data.role)
            }
        });
    } catch (error) {
        //throw new Error(error);
    }
}

export const _getUser = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/user/get", {
            headers: {
                token: token,
            },
            params: {
                id: Number(data.id),
            }
        });
    } catch (error) {
        //throw new Error(error);
    }
}

export const _createNewUser = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/user/create', 
        {
            name: data.name,
            role: Number(data.role),
            email: data.email,
            password: data.password,
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

export const _updateUser = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/user/update', 
        {
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
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