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
        <FilterForm key="filter-form" />
        {
            isLoading ? 
            <Box align="center" size="large" style={{ paddingTop: "60px" }}>
                <PacmanLoader color="#00CCEB" />
            </Box>
                : 
                userEvents ?
                [
                    <Stats key="stats" />
                ] : null
        }
    </Box>
);

export default connector(SearchPage);