const initialState = {
    listWork : [],
    totalPage: 1,
    currentPage: 1,
    isMin: true,
    isMax: true,
    iSearchMode: false,
}

const listWorkReducer = (state = initialState, action) => {
    switch(action.type){
        case "LIST_WORK":
            return {...state, ...action.payload}
    }
    return state;
}

export default listWorkReducer;