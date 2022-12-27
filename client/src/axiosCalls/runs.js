import Axios from 'axios';
import { ReactSession } from 'react-client-session';

import { _SERVER_BASE_URL } from '../helpers/const';

ReactSession.setStoreType("localStorage");
const token = ReactSession.get("tokenProject");
const user = ReactSession.get("userProject");

export const _createRun = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/runs/create', 
        {
            subject: Number(data.subject),
            teacher: Number(data.teacher),
            start: data.start,
            length: Number(data.length),
            canSign: Number(data.canSign),
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

export const _updateRun = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/runs/update', 
        {
            id: Number(data.id),
            teacher: Number(data.teacher),
            start: data.start,
            length: Number(data.length),
            canSign: Number(data.canSign),
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

export const _addStudentToRun = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/runs/add-student', 
        {
            run: Number(data.run),
            student: Number(data.student),
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

export const _getRun = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/runs/get", {
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

export const _listRuns = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/runs/list", {
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

export const _listRunsStudents = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/runs/list-students", {
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

export const _alterActivityOfRun = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/runs/alter-activity', 
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

export const _getStudentsRuns = async (data) => {
    try {
        return await Axios.get(_SERVER_BASE_URL + "/runs/get-students-run", {
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

export const _signUnsignStudentFromRun = async (data) => {
    try {
        return await Axios.post(_SERVER_BASE_URL + '/runs/sign-unsign-student', 
        {
            id: Number(data.id),
            run: Number(data.run),
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