const initialState = false;

const handleSidePanelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SWITCH_PANEL':
            return !state;
        case 'CLOSE_PANEL':
            return state = false;
        default:
            return state;
    }
}

export default handleSidePanelReducer;