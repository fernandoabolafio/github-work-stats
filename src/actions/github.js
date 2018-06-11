import * as gith from '../services/github';
import act from './methods';

export const onFetchUserEvents = (username) => 
    (dispatch) => {
        dispatch(act.REQUEST_USER_EVENTS({username}))
        return gith.getUserEvents(username)
        .then(events => 
            dispatch(act.RECEIVE_USER_EVENTS(events))
        );
    }
    