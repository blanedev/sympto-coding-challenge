import useActions from 'hooks/useActions';
import { useState, useEffect } from 'react';
import { Button, Row, Table } from 'antd';
import AddAppointmentsModal from './AddAppointmentsModal';
import moment from 'moment';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import { actions } from './slice';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './styles.scss';

export const Appointments = () => {
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga });
  const location = useLocation();

  const { fetchAppointments, fetchServices, fetchPatients, addAppointments } =
    useActions(
      {
        fetchAppointments: actions.fetchAppointments,
        fetchServices: actions.fetchServices,
        fetchPatients: actions.fetchPatients,
        addAppointments: actions.addAppointments,
      },
      [actions]
    );

  const appointments = useSelector((state) => state.appointments.appointments);
  const patients = useSelector((state) => state.appointments.patients);
  const services = useSelector((state) => state.appointments.services);

  const [visible, setVisible] = useState(false);
  const [initialPatient, setInitialPatient] = useState(null);
  const onOpen = () => setVisible(true);
  const onCancel = () => setVisible(false);
  const onOk = (values) => {
    const { patient, services, illness, total } = values;
    const formattedValues = {
      patient,
      illness,
      services,
      total,
      date: moment().format('YYYY-MM-DD'),
    };

    addAppointments(formattedValues);
    setVisible(false);
  };

  useEffect(() => {
    fetchAppointments();
    fetchServices();
    fetchPatients();
  }, [fetchAppointments, fetchPatients, fetchServices]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Patient Name',
      dataIndex: 'patient',
      key: 'name',
      render: (patient) => patient?.name,
    },
    {
      title: 'Patient Phone',
      dataIndex: 'patient',
      key: 'phone',
      render: (patient) => patient?.phone,
    },
    {
      title: 'Illness',
      dataIndex: 'illness',
      key: 'illness',
    },
    {
      title: 'Services',
      dataIndex: 'services',
      key: 'services',
      render: (ids) => {
        const usageServices = ids
          ?.map((id) => {
            const currentService = services.find(
              (service) => service.id === id
            );
            return currentService.name;
          })
          .join(', ');
        return usageServices;
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `$${total}`,
    },
  ];

  const formattedPatients = patients.map((item) => ({
    ...item,
    dob: item?.dob ? moment(item?.dob) : undefined,
  }));

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('initialPatient')) {
      setInitialPatient(urlParams.get('initialPatient'));
      setVisible(true);
    }
  }, [location]);

  return (
    <>
      <Row justify="space-between" align="middle">
        <h2>Appointments</h2>
        <Button type="primary" onClick={onOpen}>
          Add
        </Button>
      </Row>
      <Table columns={columns} dataSource={appointments} />
      <AddAppointmentsModal
        visible={visible}
        patients={formattedPatients}
        initialPatient={initialPatient}
        services={services}
        onCancel={onCancel}
        onOk={onOk}
      />
    </>
  );
};

export default Appointments;
