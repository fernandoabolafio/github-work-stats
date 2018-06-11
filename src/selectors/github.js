import compose from "lodash/fp/compose";
import get from "lodash/fp/get";
import * as dh from '../services/data_handler';

const getIsRequesting = key => get(["github", key, "isRequesting"]);
const getResponse = key => get(["github", key, "response"]);

export const userEventsResponse = getResponse("userEvents");
export const userEventsIsRequesting = getIsRequesting("userEvents");
export const userEventsAggregateByType = state => {
    const userEvents = userEventsResponse(state) || [];
    // XXX Refactor this code using compose
    //and maybe move it all to data_handlers
    const data = dh.resumeAggregate(dh.aggregateBy("type")(dh.toArray(userEvents)));
    return data;
}
export const userEventsAggregateByOrg = state => {
    const userEvents = userEventsResponse(state) || [];
    const data = dh.resumeAggregate(dh.aggregateBy("type")(dh.toArray(userEvents)));
}