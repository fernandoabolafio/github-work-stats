import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as sel from '../selectors';

export default connect(
    sel.selectorMap({
        userEvents: sel.userEventsFilteredAggregateByType
    }),
    dispatch => bindActionCreators({
    }, dispatch)
);