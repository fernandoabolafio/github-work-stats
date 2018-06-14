import React from 'react';
import connector from '../connectors/filters';
import Columns from 'grommet/components/Columns';
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
    renderOrgsFilter = () => (
        <Box>
            <Label size="small" margin="small">Organizations:</Label>
            <Columns>
                {this.props.userEventsByOrg.map(usEv =>
                    <Box>
                        <CheckBox
                            label={usEv.name}
                            checked={this.props.orgFilters[usEv.name]}
                            onChange={() => this.props.toggleOrgFilter(usEv.name)}
                        />
                    </Box>
                )}
            </Columns>
        </Box>
    )
    renderRepoFilter = () => (
        <Box>
            <Label size="small" margin="small">Repositories:</Label>
            <Columns>
                {this.props.userEventsByRepo.map(usEv =>
                    <Box>
                        <CheckBox
                            label={usEv.name}
                            checked={this.props.repoFilters[usEv.name]}
                            onChange={() => this.props.toggleRepoFilter(usEv.name)}
                        />
                    </Box>
                )}
            </Columns>
        </Box>
    )
    renderEventTypeFilter = () => (
        <Box>
            <Label size="small" margin="small">Events:</Label>
            <Columns>
                {this.props.userEventsByType.map(usEv =>
                    <Box>
                        <CheckBox
                            label={usEv.name}
                            checked={this.props.typeFilters[usEv.name]}
                            onChange={() => this.props.toggleTypeFilter(usEv.name)}
                        />
                    </Box>
                )}
            </Columns>
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
                    showClearDates
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
        return (
            <Box align="left" size="large" pad="medium" style={{ paddingTop: "0px" }}>
                <Label>Filters:</Label>
                {this.renderOrgsFilter()}
                {this.renderRepoFilter()}
                {this.renderEventTypeFilter()}
                {this.renderDatePickerFilter()}
            </Box>
        );
    }
}

export default connector(FiltersForm);