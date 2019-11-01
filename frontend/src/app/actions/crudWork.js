import axios from 'axios';
import qs from 'querystring';

const CREATE_WORK = "CREATE_WORK";
const UPDATE_WORK = "UPDATE_WORK";
const DELETE_WORK = "DELETE_WORK";
const ERROR = "ERROR";

// CREATE WORK-------------------------
const createWork = (data) => {
    return {
        type: CREATE_WORK,
        payload: {
            name: data.name,
            status: data.status,
            message: "Create Work Successfully..."
        }
    }
}

export const CREATE_WORK_THUNK = (data) => {
    return ((dispatch) => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/work/',
            data: qs.stringify(data),
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }}).then((res) => {
                dispatch(createWork(data));
                console.log(res.status);
            }).catch((err) => {
                dispatch(onError(err.message))
            })
    })
}

// UPDATE WORK-------------------------
const updateWork = (data) => {
    return {
        type: UPDATE_WORK,
        payload: {
            id: data.id,
            name: data.name,
            status: data.status,
            message: "Update Work Successfully..."
        }
    }
}

export const UPDATE_WORK_THUNK = (data) => {
    return ((dispatch) => {
        axios({
            method: 'put',
            url: 'http://localhost:8000/work/',
            data: qs.stringify({
                id: data.id,
                name: data.name, 
                status: data.status
              }),
            headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }}).then((res) => {
                dispatch(updateWork(data));
                console.log(res.status);
            }).catch((err) => {
                dispatch(onError(err.message))
            })
    })
}

const deleteWork = (data) => {
    return{
        type: DELETE_WORK,
        payload: {
            id: data.id,
            message: "Delete Work Successfully..."
        }
    }
}

export const onError = (err) => {
    return{
        type: ERROR,
        payload: {
            message: "Occured Error on Server... " + err
        }
    }
}