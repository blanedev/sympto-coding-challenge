import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';

export const initialState = {
  patients: [],
  loading: false,
};

const slice = createSlice({
  name: 'patients',
  initialState: initialState,
  reducers: {
    fetchPatients(state) {
      return set('loading', true)(state);
    },

    fetchPatientsSuccess(state, action) {
      return flow(
        set('loading', false),
        set('patients', action.payload)
      )(state);
    },

    addPatients(state) {
      return set('loading', true)(state);
    },

    addPatientsSuccess(state) {
      return set('loading', false)(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
