import React from 'react';
import { Route, Switch } from 'react-router';
import HomePage from 'Pages/home-page';
import ProfilePage from 'Pages/profile-page';
import ReportPage from 'Pages/report-page';
import DashboardPage from 'Pages/dashboard-page';

const publicRoutes = [
    {
        path: '/',
        component: <HomePage />,
        withNavbar: false
    }
]

const privateRoutes = [
    {
        path: '/profile',
        component: <ProfilePage />,
        withNavbar: true
    },
    {
        path: '/report/:id',
        component: <ReportPage />,
        withNavbar: false
    },
    {
        path: '/dashboard',
        component: <DashboardPage />,
        withNavbar: true
    }
]

export const routes = {
    public: publicRoutes,
    private: privateRoutes
}