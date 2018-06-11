import React from 'react';
import connector from '../connectors/filters';
import Box from 'grommet/components/Box';
import CheckBox from 'grommet/components/CheckBox';
import Label from 'grommet/components/Label';

class FiltersForm extends React.Component {
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
    render() {
        const { userEventsByOrg } = this.props;
        return (
            <Box align="left" size="large" pad="medium" style={{ paddingTop: "0px" }}>
                <Label>Filters:</Label>
                {this.renderOrgsFilter(userEventsByOrg)}
            </Box>
        );
    }
}

export default connector(FiltersForm);