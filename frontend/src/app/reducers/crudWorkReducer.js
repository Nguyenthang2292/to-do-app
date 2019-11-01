const initialState = {
    isCreateWork: true
}

const crudWorkReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_WORK":
            console.log(action.payload);
            return {state,...action.payload}
        case "UPDATE_WORK":
            console.log(action.payload);
            state.isCreateWork = false;
            return {state,...action.payload}
        case "DELETE_WORK":
            console.log(action.payload);
            return {state,...action.payload}
        case "ERROR":
            console.log(action.payload);
            return state;
        default:
            return state;
    }
}

export default crudWorkReducer;