import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { getItem, setItem } from 'utils/localStorage';
import { actions } from './slice';

function* fetchPatients() {
  yield takeLatest(actions.fetchPatients, fetchPatientsTask);
}

function* fetchPatientsTask() {
  const patients = getItem('patients') || [];
  yield put(actions.fetchPatientsSuccess(patients));
}

function* fetchServices() {
  yield takeLatest(actions.fetchServices, fetchServicesTask);
}

function* fetchServicesTask() {
  const services = getItem('services') || [];
  yield put(actions.fetchServicesSuccess(services));
}

function* fetchAppointments() {
  yield takeLatest(actions.fetchAppointments, fetchAppointmentsTask);
}

function* fetchAppointmentsTask() {
  const patients = getItem('patients') || [];
  const appointments = getItem('appointments') || [];
  const formattedData = appointments.map((appointment) => {
    const currentPatient = patients.find(
      (patient) => patient.id === appointment.patient
    );
    return {
      ...appointment,
      patient: currentPatient,
    };
  });
  yield put(actions.fetchAppointmentsSuccess(formattedData));
}

function* addAppointments() {
  yield takeLatest(actions.addAppointments, addAppointmentsTask);
}

function* addAppointmentsTask(action) {
  const appointments = getItem('appointments') || [];
  appointments.push({
    ...action.payload,
    id: appointments[appointments.length - 1]
      ? appointments[appointments.length - 1].id + 1
      : 1,
  });
  setItem('appointments', appointments);
  yield put(actions.addAppointmentsSuccess());
  yield put(actions.fetchAppointments());
}

export default function* defaultSaga() {
  yield all([
    fork(fetchPatients),
    fork(fetchAppointments),
    fork(addAppointments),
    fork(fetchServices),
  ]);
}
