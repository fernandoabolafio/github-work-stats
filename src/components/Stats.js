import React from 'react';
import connector from '../connectors/stats';
import Spinning from 'grommet/components/icons/Spinning';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

class Stats extends React.Component {
    renderListOfEvents = (events) =>
      <List separator='horizontal'>
          {events.map(ev => <ListItem justify='between' >
            <span>{ev.name}</span>
            <span className="secondary">{ev.count}</span>
          </ListItem>)}
      </List>
        
    render() {
        const { userEvents } = this.props;
        return (
            <Box size="large" >
                {this.renderListOfEvents(userEvents)}
            </Box>
        );
    }
}

export default connector(Stats);