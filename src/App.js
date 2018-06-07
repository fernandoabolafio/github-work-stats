import React from 'react';
import App from 'grommet/components/App';
import Title from 'grommet/components/Title';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import SearchInput from 'grommet/components/SearchInput';
import * as gith from './services/github';
import Routes from './routes';


const aggregate = (events) => events
  .reduce((acc, event) => 
  {
    if(!acc[event.type]) {
      acc[event.type] = [event]
    } else {
      acc[event.type].push(event)
    }
    return acc;
  }, {})

const aggregateStats = (aggEvents) => 
  Object.keys(aggEvents).map(type => {
    const name = type;
    const count = aggEvents[type].length;
    return ({ name, count });
  });

class GWS extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      res: {},
      userStats: undefined
    }
  }
  handleSearch = (e) => {
    e.preventDefault();
    gith.getUserEvents(this.state.username)
      .then(({ body }) => this.setState({ 
        userStatsRaw: this.getAggregate(body),
        userStats: this.getAggregateStats(this.getAggregate(body))
       }))
      .catch(e => console.log(e))
  }
  getAggregate = (userStats) => 
      aggregate(userStats || [])
  getAggregateStats = (aggregate) => 
      aggregateStats(aggregate)
  
  render() {
    return (
      <App>
      <Title>Github work stats</Title>
      <p>Get github work stats by username</p>
      <Form onSubmit={this.handleSearch}>
        <FormField label={"username"} >
          <SearchInput onDOMChange={(e) => this.setState({ username: e.target.value })} />
        </FormField>
        <p>{JSON.stringify((this.state.userStatsRaw), null, 2)}</p>
        <p>{JSON.stringify((this.state.userStats), null, 2)}</p>
      </Form>
      <Routes />
    </App>
    )
  }
}


export default GWS;
