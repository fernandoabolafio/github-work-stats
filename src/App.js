import React from 'react';
import 'react-dates/initialize';
import App from 'grommet/components/App';
import Title from 'grommet/components/Title';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import FormField from 'grommet/components/FormField';
import SearchInput from 'grommet/components/SearchInput';
import Box from 'grommet/components/Box';
import * as gith from './services/github';
import Routes from './routes';

class GWS extends React.Component {
  render() {
    return (
      <App>
      <Box align="center">
        <Header>
          <Title>Github work stats</Title>
        </Header>
      </Box>
      <Routes />
    </App>
    )
  }
}


export default GWS;
