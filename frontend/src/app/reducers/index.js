import handleSidePanelReducer from './handleSidePanelReducer';
import crudWorkReducer from './crudWorkReducer';
import listWorkReducer from './listWorkReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    handleSidePanelReducer,
    crudWorkReducer,
    listWorkReducer
})

export default rootReducer;