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
                <PacmanLoader color="#00CCEB" />
                : 
                userEvents ?
                [
                    <FilterForm key="filter-form" />,
                    <Stats key="stats" />
                ] : null
        }
    </Box>
);

export default connector(SearchPage);