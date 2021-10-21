import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { Container, CssBaseline } from '@material-ui/core';
import Dashboard from './pages/dashboard/dashboard';
import MLDashboard from './pages/ml-dashboard/ml-dashboard';
import NotFound from './pages/not-found/not-found';
import PatientReports from './pages/patient-reports/patient-reports';
import UserProfile from './pages/user-profile/user-profile';
import MasterLayout from './shared/components/layouts/master/master-layout';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import PatientList from './pages/patient-list/patient-list';
import AssignedTask from './pages/assigned-task/assigned-task';

interface RoutesProps {
  path: string;
  component: React.ComponentType<any>
}
const routes: RoutesProps[] = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  }, {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/ml-dashboard',
    component: MLDashboard
  },
  {
    path: '/reports',
    component: PatientReports
  },
  {
    path: '/profile',
    component: UserProfile
  },
  {
    path: '/not-found',
    component: NotFound
  },
  {
    path: '/patient-list',
    component: PatientList
  },
  {
    path: '/assigned-task',
    component: AssignedTask
  }
];

function App() {
  const [isLoggedIn,] = useState(true);
  return (
    <div style={{ 'width': '100%' }}>
      <BrowserRouter>
        <CssBaseline />
        {isLoggedIn && <MasterLayout>
          <Container maxWidth='lg'>
            {routes.map((route, i) => {
              return <Route exact path={route.path} key={i} component={route.component} />
            })}
          </Container>
        </MasterLayout>}
        {!isLoggedIn && <Route exact path="/login" component={Login} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
