import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';

export const initialState = {
  patients: [],
  services: [],
  appointments: [],
  loading: false,
};

const slice = createSlice({
  name: 'appointments',
  initialState: initialState,
  reducers: {
    fetchServices(state) {
      return set('loading', true)(state);
    },

    fetchServicesSuccess(state, action) {
      return flow(
        set('loading', false),
        set('services', action.payload)
      )(state);
    },

    fetchAppointments(state) {
      return set('loading', true)(state);
    },

    fetchAppointmentsSuccess(state, action) {
      return flow(
        set('loading', false),
        set('appointments', action.payload)
      )(state);
    },

    fetchPatients(state) {
      return set('loading', true)(state);
    },

    fetchPatientsSuccess(state, action) {
      return flow(
        set('loading', false),
        set('patients', action.payload)
      )(state);
    },

    addAppointments(state) {
      return set('loading', true)(state);
    },

    addAppointmentsSuccess(state) {
      return set('loading', false)(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
