import axios from '../api';
import React, { useState, useEffect } from "react";
import Appointment from './Appointment';
import * as _ from 'lodash';

export default function AppointmentList(props) {
  //these are the props we are passing into AppointmentList, but shouldn't this be defined at the parent component level? Or is that happening in line 26?
  const { days, selectedDayId, allAppointments, allInterviewers } = props; //allows you to use days instead of props.days
  if (!days[selectedDayId]) return (<></>);
  const appointmentIdxs = days[selectedDayId].appointments;

  //This is consolidating different requests from DB
  const appointments = appointmentIdxs // start out with list of appt ids
    .map(apptIdx => allAppointments[apptIdx]) // convert each appt id into the relevant appt object
    .map(appt => { // each appt object has appt.interview.interviewer equal to the interviewer id
      let interviewData = null;
      if (appt.interview) {
        interviewData = { 
          interviewer: allInterviewers[appt.interview.interviewer] 
        }; 
      }
      // replace the interviewer id with the entire interviewer object based on that id
      return _.merge({}, appt, { interview: interviewData }); // 3rd arg: { interview: { interviewer: {...} } }
    }
  );

  return appointments.map(appt => <Appointment key={appt.id} {...appt} />);
}
