const INITIAL_STATE = {};

const ACTION_HANDLER = {
    
};

const appReducer = (state = INITIAL_STATE, action) => {
    const handler = ACTION_HANDLER[action.type];
    return handler ? handler(state, action) : state;
};

export default appReducer;