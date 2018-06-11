import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as sel from '../selectors';
import act from '../actions/methods';

export default connect(
    sel.selectorMap({
        userEventsByOrg: sel.userEventsAggregateByOrg,
        orgFilters: sel.orgFilters
    }),
    dispatch => bindActionCreators({
        toggleOrgFilter: act.TOGGLE_ORG_FILTER
    }, dispatch)
);