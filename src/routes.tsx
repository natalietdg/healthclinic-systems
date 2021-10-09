import React from 'react';
import { Route, Switch } from 'react-router';
import HomePage from 'Pages/home-page';
import ProfilePage from 'Pages/profile-page';
import ReportPage from 'Pages/report-page';
import DashboardPage from 'Pages/dashboard-page';
import Patient from 'Pages/patient-page';

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
    },
    {
        path: '/new-patient',
        component: <Patient.NewPatientPage />,
        withNavbar: true
    },
    {
        path: '/patients',
        component: <Patient.PatientDatabase />,
        withNavbar: true
    },
    {
        
        path: '/patient/:id',
        component: <Patient.NewPatientPage />,
        withNavbar: true
       
    }
]

export const routes = {
    public: publicRoutes,
    private: privateRoutes
}