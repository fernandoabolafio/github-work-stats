import React from 'react';
import Box from 'grommet/components/Box';
import SearchForm from './SearchForm';  
import Stats from './Stats';
import FilterForm from './FiltersForm';
import connector from '../connectors/searchPage';
import { PacmanLoader } from 'react-spinners';
import Notification from 'grommet/components/Notification';

const SearchPage = ({ isLoading, userEvents, error }) => (
    <Box align="center">
        <SearchForm />
        {
            isLoading ? 
            <Box align="center" size="large" style={{ paddingTop: "60px" }}>
                <PacmanLoader color="#00CCEB" />
            </Box>
                : 
                userEvents ?
                [
                    <FilterForm key="filter-form" />,
                    <Stats key="stats" />
                ] : error ? 
                <Notification
                    message="Error"
                    state={error}
                    status="critical"
                /> : "Type your Github username to fetch the stats"
        }
    </Box>
);

export default connector(SearchPage);