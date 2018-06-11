import React from 'react';
import Box from 'grommet/components/Box';
import SearchForm from './SearchForm';  
import Stats from './Stats';

const SearchPage = () => (
    <Box align="center">
        <SearchForm />
        <Stats />
    </Box>
);

export default SearchPage;