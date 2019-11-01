const SWITCH_PANEL = "SWITCH_PANEL";
const CLOSE_PANEL = "CLOSE_PANEL";

export const switchPanel = (data) => {
    return {
        type: SWITCH_PANEL,
        payload: {...data}
    }
}

export const closePanel = (data) => {
    return {
        type: CLOSE_PANEL,
        payload: {...data, isCreateWork: true}
    }
}
