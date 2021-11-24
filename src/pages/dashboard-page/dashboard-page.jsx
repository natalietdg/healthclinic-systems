import React from 'react';
import Dashboard from 'Components/dashboard';
import { Helmet } from 'react-helmet';
const DashboardPage = () => {
    return(
        <div>
            <Helmet><title>Dashboard</title></Helmet>
            <Dashboard />
        </div>
    )
}

export default DashboardPage;