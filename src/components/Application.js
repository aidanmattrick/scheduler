import client from '../api';
import axios from 'axios';
import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";
import AppointmentList from './AppointmentList';
import { withState as selectorsForState, getInterview } from '../helpers/selectors';

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




function Application(props) {
  // Values to be loaded (roughly) once
  const [state, setState] = useState({
    interviewers: {},
    appointments: {},
    days: {}
  });
  const [selectedDayId, setSelectedDayId] = useState(1);
  
  // Sort of transient states (changed based on other state changes)
  const [day, setDay] = useState({});
  const [dailyAppointments, setDailyAppointments] = useState([]);
  const [availableInterviewers, setAvailableInterviewers] = useState([]);
  //Whenever setDay is called, component is re-rendered

  //ensuring that API data sets State
  const handleData = (daysData, interviewersData, appointmentsData) => {
    setState({
      interviewers: interviewersData.data,
      appointments: appointmentsData.data,
      days: Object.fromEntries(daysData.data.map(day => [ day.id, day ]))
    });
  };
  //Hook to make sure we run just once
  useEffect(fetchDataWithHandler(handleData), []);

  const updateDailyStates = () => {
    const { getAppointmentsForDayId, getInterviewersForDayId } = selectorsForState(state);
    if (!state.days[selectedDayId]) return;
    setDay(state.days[selectedDayId]);
    setDailyAppointments(getAppointmentsForDayId(selectedDayId));
    setAvailableInterviewers(getInterviewersForDayId(selectedDayId));
  };
  useEffect(updateDailyStates, [ state, selectedDayId ]);

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    return client.put(`/appointments/${id}`, appointment)
    .then(result => {
      const appointments = {
        ...state.appointments,
        [id]: getInterview(state, appointment)
      };
      setState({ ...state, appointments });
    });
  };

  const removeInterview = function(id) {
    return client.delete(`/appointments/${id}`)
    .then(result => {
      const appointments = {
        ...state.appointments,
        [id]: {
          ...state.appointments[id],
          interview: null
        }
      };
      setState({ ...state, appointments });
    });
  };



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        
        <hr className="sidebar__separator sidebar--centered" />
          <DayList
            days={state.days}
            selectedDayId={selectedDayId}
            setDay={(id) => setSelectedDayId(id)}
            appointments={state.appointments}
            />
        <nav className="sidebar__menu" />
        <img className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <AppointmentList {...{day, dailyAppointments, availableInterviewers, bookInterview, removeInterview}} />
      </section>
    </main>
  );
}

export default hot(Application);
//export default Application;