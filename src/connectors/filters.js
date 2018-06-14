import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as sel from '../selectors';
import act from '../actions/methods';

export default connect(
    sel.selectorMap({
        userEventsByOrg: sel.userEventsAggregateByOrg,
        userEventsByRepo: sel.userEventsAggregateByRepo,
        orgFilters: sel.orgFilters,
        repoFilters: sel.repoFilters,
        dateFilters: sel.dateFilters
    }),
    dispatch => bindActionCreators({
        toggleOrgFilter: act.TOGGLE_ORG_FILTER,
        toggleRepoFilter: act.TOGGLE_REPO_FILTER,
        setDateFilter: act.SET_DATE_FILTER
    }, dispatch)
);