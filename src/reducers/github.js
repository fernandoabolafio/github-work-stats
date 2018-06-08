import * as act from '../actions/types';
import { request, receive, reset } from "./utils";

const INITIAL_STATE = {};

const ACTION_HANDLER = {
    [act.REQUEST_USER_EVENTS]: (state, action) => request("userEvents", state, action),
    [act.RECEIVE_USER_EVENTS]: (state, action) => receive("userEvents", state, action)
};

const githubReducer = (state = INITIAL_STATE, action) => {
    const handler = ACTION_HANDLER[action.type];
    return handler ? handler(state, action) : state;
};

export default githubReducer;