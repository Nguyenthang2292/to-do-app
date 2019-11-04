const initialState = {
    isCreateWork: true,
    isSidePanelOpen: false
};

const handleSidePanelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SWITCH_PANEL':
            const switchPanel = {
                isSidePanelOpen: !action.payload.isSidePanelOpen
            }
            return {...state, ...action.payload, ...switchPanel}
        case 'CLOSE_PANEL':
            return {...state, isSidePanelOpen: false, isCreateWork: true};
        default:
            return state;
    }
}

export default handleSidePanelReducer;