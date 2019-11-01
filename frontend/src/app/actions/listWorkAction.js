import {onError} from './crudWorkAction';
import axios from 'axios';

const LIST_WORK ="LIST_WORK";

// LIST WORK -------------------------------------
const listWork = (data) => {
    return {
        type: LIST_WORK,
        payload: {
            ...data
        }
    }
}

export const LIST_WORK_THUNK = (page = 1) => {
    return ((dispatch) => {
        axios({
        method: 'get',
        url: 'http://localhost:8000/work/',
        params: {page: page},
        headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
        }).then((res) => {
          console.log('Load data sucessfully... --> Message from Server: ', res.status);
          const data = res.data.data;
          let state = {
            listWork : data.listWorkArr,
            totalPageInit: data.totalPage,
            totalPage: data.totalPage,
            currentPage: 1,
            isMin: true,
            isMax: true,
          }
         if (data.totalPage === 1) {
           state = {...state,
                isMin: true,
                isMax: true
            }
         }
         if(data.totalPage > state.currentPage) {state={...state, isMax: false}}
         if(data.totalPage < state.currentPage) {
            LIST_WORK_THUNK(state.totalPage); 
            state = {...state, currentPage: state.currentPage - 1}
        }
         dispatch(listWork(state));
        }).catch((err) => {
            dispatch(onError(err.message))
        })
    }) 
}