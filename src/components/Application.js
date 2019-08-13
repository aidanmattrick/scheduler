
import { hot } from 'react-hot-loader/root';
import React from "react";

import "components/Application.scss";

import DayList from "./DayList";
import AppointmentList from './AppointmentList';
import useApplicationData from '../hooks/useApplicationData';

//import reducer from "reducers/application";


function Application(props) {
  const {
    state,
    day,
    selectDay,
    bookInterview,
    removeInterview
  } = useApplicationData();
  const dayId = day ? day.id : -1;

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
            selectedDayId={dayId}
            setDay={(id) => selectDay(id)}
            appointments={state.appointments}
            />
        <nav className="sidebar__menu" />
        <img className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <AppointmentList {...{day, bookInterview, removeInterview}} />
      </section>
    </main>
  );
}

export default hot(Application);
//export default Application;

//setState(prev => ({...prev, new: true }))
//reducers solve this

// function reducer(state, action) {
//   if(action.type === "SET_DAY") {
//     return {
//       ...state,
//       day: action.day
//     }
//   }
//   return state;
// }

// expect(reducer({
//   day: "Monday"
// }, { type: "SET_DAY", day: "Tuesday" })).toEqual({
//   day: "Tuesday"
// })