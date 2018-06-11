import compose from "lodash/fp/compose";
import get from "lodash/fp/get";
import find from "lodash/find";
import * as dh from '../services/data_handler';
import * as app from './app';
import moment from 'moment';

const getIsRequesting = key => get(["github", key, "isRequesting"]);
const getResponse = key => get(["github", key, "response"]);

export const userEventsResponse = getResponse("userEvents");
export const userEventsIsRequesting = getIsRequesting("userEvents");
export const userEventsAggregateByType = state => {
    // XXX Refactor this code using compose
    //and maybe move it all to data_handlers
    const userEvents = userEventsResponse(state) || [];
    const orgFilters = app.orgFilters(state);
    const dateFilter = app.dateFilters(state);
    const activeOrgFilters = Object.keys(orgFilters).filter(key => orgFilters[key]);
    const filteredEventsByOrg = activeOrgFilters.length > 0 ?
        dh.toArray(userEvents).filter(ev => {
          const orgValue = get(["org", "login"], ev);
          return activeOrgFilters.includes(orgValue);
        })
        : dh.toArray(userEvents);
    const filteredEventsByDate = dateFilter.startDate && dateFilter.endDate ? 
        filteredEventsByOrg.filter(ev => 
            {
                return moment(ev.created_at).isBefore(dateFilter.endDate) && 
                    moment(ev.created_at).isAfter(dateFilter.startDate);
            }
        ) : filteredEventsByOrg;

    const data = dh.resumeAggregate(dh.aggregateBy("type")(filteredEventsByDate));
    return data;
}
export const userEventsAggregateByOrg = state => {
    const userEvents = userEventsResponse(state) || [];
    const data = dh.resumeAggregate(dh.aggregateByDeepKey(["org", "login"])(dh.toArray(userEvents)));
    return data;
}