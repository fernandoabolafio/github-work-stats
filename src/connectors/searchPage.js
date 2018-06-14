import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as sel from '../selectors';
import * as act from '../actions';

export default connect(
    sel.selectorMap({
        userEvents: sel.userEventsResponse,
        error: sel.userEventsError,
        isLoading: sel.userEventsIsRequesting
    }),
    dispatch => bindActionCreators({
        exportData: act.exportData
    }, dispatch)
);