import * as act from '../actions/types';

const INITIAL_STATE = {
    orgFilters: {},
    repoFilters: {},
    typeFilters: {},
    dateFilters: {}
};


const ACTION_HANDLER = {
    [act.TOGGLE_ORG_FILTER]: (state, action) => ({ ...state, orgFilters: {
        ...state.orgFilters,
        [action.payload]: !state.orgFilters[action.payload]
    }}),
    [act.TOGGLE_REPO_FILTER]: (state, action) => ({ ...state, repoFilters: {
        ...state.repoFilters,
        [action.payload]: !state.repoFilters[action.payload]
    }}),
    [act.TOGGLE_TYPE_FILTER]: (state, action) => ({ ...state, typeFilters: {
        ...state.typeFilters,
        [action.payload]: !state.typeFilters[action.payload]
    }}),
    [act.SET_DATE_FILTER]: (state, { payload: { startDate, endDate }}) => ({ ...state, dateFilters: { 
         startDate, endDate
    }})
};

const appReducer = (state = INITIAL_STATE, action) => {
    const handler = ACTION_HANDLER[action.type];
    return handler ? handler(state, action) : state;
};

export default appReducer;