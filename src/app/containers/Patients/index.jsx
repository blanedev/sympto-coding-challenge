import useActions from 'hooks/useActions';
import { useState, useEffect } from 'react';
import { Button, Row, Table, notification } from 'antd';
import AddPatientModal from './AddPatientModal';
import moment from 'moment';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import { actions } from './slice';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getItem } from 'utils/localStorage';
import './styles.scss';

export const Patients = () => {
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga });
  const history = useHistory();

  const { fetchPatients, addPatients } = useActions(
    {
      fetchPatients: actions.fetchPatients,
      addPatients: actions.addPatients,
    },
    [actions]
  );
  const patients = useSelector((state) => state.patients.patients);
  const [visible, setVisible] = useState(false);

  const openNotification = (patient) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        onClick={() => {
          notification.close(key);
          history.push({
            pathname: '/appointments',
            search: `?initialPatient=${patient.id}`,
          });
        }}
      >
        New appointment
      </Button>
    );

    notification.open({
      message: 'Created successfully',
      description:
        'A new patient was created successfully. Continue to create a new appointment for this patient.',
      placement: 'bottomLeft',
      type: 'success',
      key,
      btn,
    });
  };

  const onOpen = () => setVisible(true);

  const onCancel = () => setVisible(false);

  const onOk = (values) => {
    const patients = getItem('patients') || [];
    const newPatient = {
      ...values,
      date: moment().format('YYYY-MM-DD'),
      dob: values.dob.format('YYYY-MM-DD'),
      id: patients[patients.length - 1]
        ? patients[patients.length - 1].id + 1
        : 1,
    };

    addPatients(newPatient);
    setVisible(false);
    openNotification(newPatient);
  };

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Registered Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => gender.charAt(0).toUpperCase() + gender.slice(1),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Birthday',
      dataIndex: 'dob',
      key: 'dob',
      render: (date) => moment(date).format('YYYY/MM/DD'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <>
      <Row justify="space-between" align="middle">
        <h2>Patients</h2>
        <Button type="primary" onClick={onOpen}>
          Add
        </Button>
      </Row>
      <Table columns={columns} dataSource={patients} />
      <AddPatientModal visible={visible} onCancel={onCancel} onOk={onOk} />
    </>
  );
};

export default Patients;
