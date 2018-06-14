import compose from "lodash/fp/compose";
import get from "lodash/fp/get";
import find from "lodash/find";
import * as dh from '../services/data_handler';
import * as app from './app';
import moment from 'moment';

const getIsRequesting = key => get(["github", key, "isRequesting"]);
const getResponse = key => get(["github", key, "response"]);
const getError = key =>  get(["github", key, "error"]);

export const userEventsResponse = getResponse("userEvents");
export const userEventsIsRequesting = getIsRequesting("userEvents");
export const userEventsError = compose(get(["body", "message"]), getError("userEvents"));
export const userEventsFiltered = state => {
    const uE = userEventsResponse(state) || [];
    const userEvents = dh.toArray(uE);
    const orgFilters = app.orgFilters(state);
    const repoFilters = app.repoFilters(state);
    const dateFilter = app.dateFilters(state);

    const activeOrgFilters = Object.keys(orgFilters).filter(key => orgFilters[key]);
    const activeRepoFilters = Object.keys(repoFilters).filter(key => repoFilters[key]);

    const filterByOrg = dh.createBasicFilter(["org", "login"], activeOrgFilters);
    const filterByRepo = dh.createBasicFilter(["repo", "name"], activeRepoFilters);
    const filterByDate = dh.createCustomFilter(ev =>  
        moment(ev.created_at).isBefore(dateFilter.endDate) && 
        moment(ev.created_at).isAfter(dateFilter.startDate),
        dateFilter.startDate && dateFilter.endDate
    );
    const filters = dh.applyFilters([filterByOrg, filterByRepo, filterByDate]);
    const data = filters(userEvents);
    return data;;
}
export const userEventsAggregateByType = state =>
    dh.resumeAggregate(dh.aggregateBy("type")(userEventsFiltered(state)));

export const userEventsAggregateByOrg = state => {
    const userEvents = userEventsResponse(state) || [];
    const data = dh.resumeAggregate(dh.aggregateByDeepKey(["org", "login"])(dh.toArray(userEvents)));
    return data;
}

export const userEventsAggregateByRepo = state => {
    const userEvents = userEventsResponse(state) || [];
    const data = dh.resumeAggregate(dh.aggregateByDeepKey(["repo", "name"])(dh.toArray(userEvents)));
    return data;
}