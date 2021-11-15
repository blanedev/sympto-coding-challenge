import { useEffect, useMemo } from 'react';
import AppLayout from 'app/containers/AppLayout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { setItem, getItem } from 'utils/localStorage';
import './styles.scss';

const App = () => {
  // Prepare data
  const patients = useMemo(
    () => [
      {
        id: 1,
        date: '2021/11/02',
        name: 'John',
        email: 'John@gmail.com',
        gender: 'male',
        phone: '+84912482912',
        dob: '1999/01/01',
        address: 'New York',
      },
      {
        id: 2,
        date: '2021/11/05',
        name: 'Alice',
        email: 'Alice@gmail.com',
        gender: 'female',
        phone: '+84917882912',
        dob: '1987/10/11',
        address: 'Washington',
      },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        id: 1,
        name: 'Primary Care Visit',
        price: 500,
      },
      {
        id: 2,
        name: 'Blood  Test',
        price: 40,
      },
      {
        id: 3,
        name: 'Labs',
        price: 80,
      },
      {
        id: 4,
        name: 'Pharmacy',
        price: 120,
      },
    ],
    []
  );

  const appointments = useMemo(
    () => [
      {
        id: 1,
        date: '2021/11/05',
        illness: 'Headache',
        patient: 1,
        services: [2, 3],
        total: 120,
      },
      {
        id: 2,
        date: '2021/11/06',
        patient: 2,
        illness: 'Headache',
        services: [1, 4],
        total: 620,
      },
      {
        id: 3,
        date: '2021/11/07',
        patient: 1,
        illness: 'Headache',
        services: [1, 2],
        total: 540,
      },
    ],
    []
  );

  useEffect(() => {
    const localPatients = getItem('patients');
    if (!localPatients) setItem('patients', patients);

    const localServices = getItem('services');
    if (!localServices) setItem('services', services);

    const localAppointments = getItem('appointments');
    if (!localAppointments) setItem('appointments', appointments);
  }, [appointments, patients, services]);

  return (
    <BrowserRouter>
      <Switch>
        <Route component={AppLayout} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
