import {onError} from './crudWorkAction';
import axios from 'axios';

const LIST_WORK ="LIST_WORK";

// LIST WORK -------------------------------------
const listWork = (data) => {
    return {
        type: LIST_WORK,
        payload: {
            ...data,
        }
    }
}

export const LIST_WORK_THUNK = (data) => {
    return ((dispatch) => {
        axios({
        method: 'get',
        url: 'http://localhost:8000/work/',
        params: {page: data.currentPage},
        headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
        }).then((res) => {
          console.log('Load data sucessfully... --> Status from Server: ', res.data.data);
          const dataRes = res.data.data;
          let state = {
            listWork : dataRes.listWorkArr,
            totalPageInit: dataRes.totalPage,
            totalPage: dataRes.totalPage,
            currentPage: data.currentPage,
            isMin: data.isMin,
            isMax: data.isMax,
          }
        if(state.currentPage === state.totalPage){
            state = { ...state, isMax: true}
        }
        if(state.currentPage === 1){
            state ={...state, isMin: true}
        }
         if (state.totalPage === 1) {
           state = {...state, isMin: true, isMax: true}
         }
         if(state.totalPage > state.currentPage) {
             state={...state, isMax: false}
            }
         dispatch(listWork(state));
        }).catch((err) => {
            dispatch(onError(err.message))
        })
    }) 
}
