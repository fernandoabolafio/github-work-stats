import React from 'react';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import SearchInput from 'grommet/components/SearchInput';
import connector from '../connectors/search';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.fetchUserEvents(this.state.username)
    }
    render() {
        return (
            <Form onSubmit={this.handleSearch}>
                <FormField label={"username"} >
                    <SearchInput onDOMChange={(e) => this.setState({ username: e.target.value })} />
                </FormField>
                <p>{JSON.stringify((this.state.userStatsRaw), null, 2)}</p>
                <p>{JSON.stringify((this.state.userStats), null, 2)}</p>
            </Form>
        );
    }
}

export default connector(SearchForm);