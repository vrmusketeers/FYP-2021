import React from 'react';
import Login from '../pages/auth/login';
import Signup from '../pages/auth/signup';
import ForgotPassword from '../pages/auth/forgot-password';
import NotFound from '../pages/not-found/not-found';
import Dashboard from '../pages/dashboard/dashboard';

import LMaster from '../shared/components/layouts/master/master';
import LDashboard from '../shared/components/layouts/dashboard/l-dashboard';

const routes = [
  {
    path: 'app',
    element: <LDashboard />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
    ]
  },
  {
    path: '/',
    element: <LMaster />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'recover-password', element: <ForgotPassword /> },
      { path: '404', element: <NotFound /> }
    ]
  }
];

export default routes;