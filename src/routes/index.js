import React from 'react';
import { Route, Link } from 'react-router-dom';
import SearchPage from '../components/SearchPage';

const Routes = () => (
    <main>
        <Route exact path="/" component={SearchPage} />
    </main>
);

export default Routes;