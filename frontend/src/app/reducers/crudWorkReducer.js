const initialState = {}
const crudWorkReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_WORK":
            return {...state,...action.payload}
        case "UPDATE_WORK":
            return {...state,...action.payload}
        case "DELETE_WORK":
            return {...state,...action.payload}
        case "ERROR":
            return state;
        default:
            return state;
    }
}

export default crudWorkReducer;