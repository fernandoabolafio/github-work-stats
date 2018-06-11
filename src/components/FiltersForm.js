import React from 'react';
import connector from '../connectors/filters';
import Box from 'grommet/components/Box';
import CheckBox from 'grommet/components/CheckBox';
import Label from 'grommet/components/Label';
import { DateRangePicker } from 'react-dates';
import Moment from 'moment';

class FiltersForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: null,
          endDate: null,
          focusedInput: null,
        };
      }
    renderOrgsFilter = (userEventsByOrg) => (
        <Box
            size="large"
            align="left" 
        >   
            <Label size="small" margin="small">Organizations:</Label>
            <Box direction="row" size="large">
                {userEventsByOrg.map(usEv => 
                    <CheckBox 
                        label={usEv.name}
                        checked={this.props.orgFilters[usEv.name]}
                        onChange={() => this.props.toggleOrgFilter(usEv.name)}
                    />
                )}
            </Box>
        </Box>
    )
    renderDatePickerFilter = () => {
        const { dateFilters: { startDate, endDate }, setDateFilter } = this.props;
        const minDate = new Moment().subtract(90, 'days');
        const maxDate = new Moment();
        return (
            <Box
                size="large"
                align="left" 
            >
                <Label size="small" margin="small">Date Range:</Label>
                <DateRangePicker
                    startDate={startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => setDateFilter({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    noBorder
                    isOutsideRange={d => { 
                        return d > maxDate || d < minDate;
                    }}
                />
            </Box>
        )
    }
    render() {
        const { userEventsByOrg } = this.props;
        return (
            <Box align="left" size="large" pad="medium" style={{ paddingTop: "0px" }}>
                <Label>Filters:</Label>
                {this.renderOrgsFilter(userEventsByOrg)}
                {this.renderDatePickerFilter()}
            </Box>
        );
    }
}

export default connector(FiltersForm);