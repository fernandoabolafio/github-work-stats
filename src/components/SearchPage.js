import React from 'react';
import Box from 'grommet/components/Box';
import SearchForm from './SearchForm';  
import Stats from './Stats';
import FilterForm from './FiltersForm';
import connector from '../connectors/searchPage';
import { PacmanLoader } from 'react-spinners';
import Notification from 'grommet/components/Notification';
import Button from 'grommet/components/Button';
import DownloadIcon from 'grommet/components/icons/base/DocumentDownload';

const SearchPage = ({ isLoading, userEvents, error, exportData }) => (
    <Box align="center" style={{ paddingBottom: "60px" }}>
        <SearchForm />
        {
            isLoading ? 
            <Box align="center" size="large" style={{ paddingTop: "60px" }}>
                <PacmanLoader color="#00CCEB" />
            </Box>
                : 
                userEvents && Object.keys(userEvents).length > 0 ?
                [
                    <FilterForm key="filter-form" />,
                    <Stats key="stats" />,
                    <Button 
                        icon={<DownloadIcon />}
                        onClick={exportData}
                    >Download CSV</Button>
                ] : 
                    userEvents && Object.keys(userEvents).length === 0 ? 
                    "No activity found"
                    :
                    error ? 
                    <Box align="center" size="large" >
                        <Notification
                            message="Error"
                            state={error}
                            status="critical"
                        /> 
                    </Box>
                    : "Type your Github username to fetch the stats"
        }
    </Box>
);

export default connector(SearchPage);