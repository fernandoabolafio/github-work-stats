import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as sel from '../selectors';
import * as act from '../actions';

export default connect(
    sel.selectorMap({
    }),
    dispatch => bindActionCreators({
        fetchUserEvents: act.onFetchUserEvents
    }, dispatch)
);