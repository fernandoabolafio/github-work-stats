import React from 'react';
import connector from '../connectors/stats';
import Spinning from 'grommet/components/icons/Spinning';
import Box from 'grommet/components/Box';

class Stats extends React.Component {
    render() {
        const { userEvents, isLoading } = this.props;
        return (
            <Box size="large">
                {isLoading ? <Spinning /> : <div>{JSON.stringify(userEvents, null, 2)}</div> }
            </Box>
            
        );
    }
}

export default connector(Stats);