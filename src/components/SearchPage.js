import React from 'react';
import Box from 'grommet/components/Box';
import SearchForm from './SearchForm';  
import Stats from './Stats';
import FilterForm from './FiltersForm';
import connector from '../connectors/searchPage';
import { PacmanLoader } from 'react-spinners';

const SearchPage = ({ isLoading, userEvents }) => (
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
                ] : "Type your Github username to fetch the stats"
        }
    </Box>
);

export default connector(SearchPage);