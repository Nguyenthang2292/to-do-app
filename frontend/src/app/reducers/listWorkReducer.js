const initialState = {
    listWork : [],
    totalPageInit: 1,
    totalPage: 1,
    currentPage: 1,
    isMin: true,
    isMax: true,
}

const listWorkReducer = (state = initialState, action) => {
    if(action.type === "LIST_WORK") {
        return {...state, ...action.payload}
    }
    return state;
}

export default listWorkReducer;