import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as sel from '../selectors';
import act from '../actions/methods';

export default connect(
    sel.selectorMap({
        userEventsByOrg: sel.userEventsAggregateByOrg,
        userEventsByRepo: sel.userEventsAggregateByRepo,
        userEventsByType: sel.userEventsAggregateByType,
        orgFilters: sel.orgFilters,
        repoFilters: sel.repoFilters,
        typeFilters: sel.typeFilters,
        dateFilters: sel.dateFilters
    }),
    dispatch => bindActionCreators({
        toggleOrgFilter: act.TOGGLE_ORG_FILTER,
        toggleRepoFilter: act.TOGGLE_REPO_FILTER,
        toggleTypeFilter: act.TOGGLE_TYPE_FILTER,
        setDateFilter: act.SET_DATE_FILTER
    }, dispatch)
);