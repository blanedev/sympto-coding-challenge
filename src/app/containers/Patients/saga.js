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

function* addPatients() {
  yield takeLatest(actions.addPatients, addPatientsTask);
}

function* addPatientsTask(action) {
  const patients = getItem('patients') || [];
  patients.push(action.payload);
  setItem('patients', patients);
  yield put(actions.addPatientsSuccess(action.payload));
  yield put(actions.fetchPatients());
}

export default function* defaultSaga() {
  yield all([fork(fetchPatients), fork(addPatients)]);
}
