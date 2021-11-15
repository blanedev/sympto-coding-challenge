import Home from 'app/containers/Home';
import Patients from 'app/containers/Patients';
import Appointments from 'app/containers/Appointments';

export const routes = [
  {
    path: '/',
    component: Home,
    key: 'home',
  },
  {
    path: '/patients',
    component: Patients,
    key: 'patients',
  },
  {
    path: '/appointments',
    component: Appointments,
    key: 'appointments',
  },
];
