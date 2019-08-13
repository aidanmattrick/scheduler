import client from '../api';
import axios from 'axios';
import _ from 'lodash';
import { useReducer, useEffect } from "react";
import { withState as selectorsForState } from '../helpers/selectors';
import { newReplacedSubState, newMergedSubState } from '..//helpers/reducerHelpers';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      const newDay = action.data ? action.data : state.day.id 
      return newReplacedSubState(state, 'day', (subState, state) => getNewDailyStates(state, newDay));
    case SET_APPLICATION_DATA:
      let newState = _.merge({}, state, action.data);
      return reducer(newState, { 
        type: SET_DAY, 
        data: Object.keys(newState.days)[0] 
      });
    case SET_INTERVIEW: {
      let newState = newMergedSubState(state, 'appointments', () => ({
        [action.data.id]: {
          interview: action.data.interview
        }
      }));
      return reducer(newState, { type: SET_DAY });
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
//Getting API data
const fetchDataWithHandler = function(handler) {
  return () => { 
    axios.all([
      client.get('/days'),
      client.get('/interviewers'),
      client.get('/appointments')
    ]).then(axios.spread(handler));
  };
};

const handleData = (dispatch, daysData, interviewersData, appointmentsData) => {
  dispatch({
    type: SET_APPLICATION_DATA,
    data: {
      interviewers: interviewersData.data,
      appointments: appointmentsData.data,
      days: Object.fromEntries(daysData.data.map(day => [ day.id, day ]))
    }
  });
};

function getNewDailyStates(state, selectedDay) {
  const { getAppointmentsForDayId, getInterviewersForDayId } = selectorsForState(state);
  if (!state.days[selectedDay]) return;
  return {
    ...state.days[selectedDay],
    appointments: getAppointmentsForDayId(selectedDay),
    interviewers: getInterviewersForDayId(selectedDay)
  };
};

function selectDay(dispatch, selectedDay) {
  dispatch({ type: SET_DAY, data: selectedDay });
}

function setInterview(dispatch, id, interview = null) {
  dispatch({
    type: SET_INTERVIEW,
    data: { id, interview }
  });
}

function bookInterview(state, dispatch, id, interview) {
  return client.put(`/appointments/${id}`, { interview: { ...interview } })
  .then(response => {
    setInterview(state, dispatch, id, {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    });
  });
};

function removeInterview(dispatch, id) {
  return client.delete(`/appointments/${id}`)
  .then((response) => {
    setInterview(dispatch, id);
  });
};

export default function useApplicationData() {
  // Values to be loaded (roughly) once
  const [state, dispatch] = useReducer(reducer, {
    interviewers: {},
    appointments: {},
    days: {},
    day: {
      appointments: [],
      interviewers: []
    }
  });
  
  useEffect(fetchDataWithHandler(_.bind(handleData, this, dispatch)), []);

  return {
    state,
    day: state.day,
    selectDay: _.bind(selectDay, this, dispatch),
    bookInterview: _.bind(bookInterview, this, state, dispatch),
    removeInterview: _.bind(removeInterview, this, dispatch)
  };
}
