const initialState = {
    isCreateWork: true,
    isSidePanelOpen: false
};

const handleSidePanelReducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'SWITCH_PANEL':
            const switchPanel = {
                isSidePanelOpen: !state.isSidePanelOpen
            }
            return {...state, ...switchPanel, ...action.payload}
        case 'CLOSE_PANEL':
            return {...state, isSidePanelOpen: false, isCreateWork: true};
        default:
            return state;
    }
}

export default handleSidePanelReducer;