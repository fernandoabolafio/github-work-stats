import React from 'react';
import connector from '../connectors/stats';
import Spinning from 'grommet/components/icons/Spinning';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

class Stats extends React.Component {
    renderListOfEvents = (events) =>
      <List justify='between' separator='horizontal'>
          {events.map(ev => <ListItem>
            <span>{ev.name}</span>
            <span className="secondary">{ev.count}</span>
          </ListItem>)}
      </List>
        
    render() {
        const { userEvents, isLoading } = this.props;
        return (
            <Box size="large">
                {isLoading ? <Spinning /> : this.renderListOfEvents(userEvents)}
            </Box>
        );
    }
}

export default connector(Stats);