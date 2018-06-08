import * as gith from '../services/github';
import act from './methods';

export const onFetchUserEvents = (username) => 
    (dispatch) => {
        console.log('got here')
        dispatch(act.REQUEST_USER_EVENTS({username}))
        return gith.getUserEvents(username)
        .then(response => 
            dispatch(act.RECEIVE_USER_EVENTS({ ...response.body }))
        ).catch(({ response: { error } }) => 
            dispatch(act.RECEIVE_USER_EVENTS(null, error))
        )
    }
    