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
    let url, params;
    switch (data.isMode) {
        case "search":
            url = 'http://localhost:8000/work/search';
            params = {
                type: "search",
                page: data.currentPage, 
                searchValue: data.searchInputValue};
            break;
        case "sort":
            url = 'http://localhost:8000/work/sort';
            params = {
                type: "sort",
                page: data.currentPage, 
                sortValue: data.sortValue};
            break;
        default:
            url = 'http://localhost:8000/work/';
            params = {
                type: "list",
                page: data.currentPage};
            break;
    }
    return ((dispatch) => {
        axios({
        method: 'get',
        url: url,
        params: params,
        headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
        }).then((res) => {
          console.log('Load data sucessfully... --> Status from Server: ', res.data.data);
          const dataRes = res.data.data;
          let state = {
            listWork : dataRes.listWorkArr,
            totalPage: dataRes.totalPage,
            currentPage: data.currentPage,
            isSearchMode: data.isSearchMode,
            isMin: data.isMin,
            isMax: data.isMax,
            isMode: data.isMode
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
