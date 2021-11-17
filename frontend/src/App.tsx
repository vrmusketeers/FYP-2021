import React, { useCallback, useState } from 'react';
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
import { observer } from "mobx-react-lite";
import { appStore } from "./store/app-store";

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

const App = observer(()=>{
  const [isLoggedIn,] = useState(true);
  const title = appStore.appName;
  const x = useCallback(()=>{
    fetch("/api/getPatientTestDetails?patientId=2")
    .then(res => res.json())
    .then(
      (result) => {
        console.log('This is the result');
        console.log(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error);
      }
    )
  },[]);
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
        {title}
        {!isLoggedIn && <Route exact path="/login" component={Login} />}
      </BrowserRouter>
    </div>
  );
});

export default App;
