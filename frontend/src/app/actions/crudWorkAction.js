import axios from 'axios';
import qs from 'querystring';
import uuid from 'uuid/v1';

const CREATE_WORK = "CREATE_WORK";
const UPDATE_WORK = "UPDATE_WORK";
const DELETE_WORK = "DELETE_WORK";
const ERROR = "ERROR";

// CREATE WORK-------------------------
const createWork = (data) => {
    return {
        type: CREATE_WORK,
        payload: {
            message: "Create Work Successfully..." + uuid()
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
                console.log(res.data.message);
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
            message: "Update Work Successfully..." + data.id
        }
    }
}

export const UPDATE_WORK_THUNK = (data) => {
    return ((dispatch) => {
        axios({
            method: 'put',
            url: 'http://localhost:8000/work/',
            data: qs.stringify(data),
            headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }}).then((res) => {
                dispatch(updateWork(data));
                console.log(res.data.message);
            }).catch((err) => {
                dispatch(onError(err.message))
            })
    })
}

// DELETE WORK-------------------------
const deleteWork = (data) => {
    return{
        type: DELETE_WORK,
        payload: {
            message: "Delete Work Successfully..." + data.id
        }
    }
}

export const DELETE_WORK_THUNK = (data) => {
    return ((dispatch) => {
        axios({
            method: 'delete',
            url: 'http://localhost:8000/work/',
            data: qs.stringify({id: data.id}),
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }}).then((res) => {
                dispatch(deleteWork(data));
                console.log(res.data.message);
            }).catch((err) => {
                dispatch(onError(err.message))
            })
    })
}

// ON ERROR-------------------------
export const onError = (err) => {
    return{
        type: ERROR,
        payload: {
            message: "Occured Error on Server... " + err
        }
    }
}