import client from '../api';
import axios from 'axios';
import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";
import AppointmentList from './AppointmentList';

export default function Application(props) {
  const [selectedDayId, setSelectedDayId] = useState(1);
  const [days, setDays] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [allInterviewers, setAllInterviewers] = useState([]);
  //Whenever setDay is called, component is re-rendered

  const handleData = (daysData, interviewersData, appointmentsData) => {
    setAllAppointments(appointmentsData.data);
    setAllInterviewers(interviewersData.data);
    setDays(daysData.data);
  };
  
  const fetchData = () => { 
    axios.all([
      client.get('/days'),
      client.get('/interviewers'),
      client.get('/appointments')
    ]).then(axios.spread(handleData));
  };

 
  useEffect(fetchData, []);

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
            days={days}
            selectedDayId={selectedDayId}
            setDay={(id) => setSelectedDayId(id)}
            />
        <nav className="sidebar__menu" />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <AppointmentList {...{days, selectedDayId, allAppointments, allInterviewers}} />
      </section>
    </main>
  );
}

export const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Vanilla Ice",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 'last',
    time: "3pm"
  }

];

