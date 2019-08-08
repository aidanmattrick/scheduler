import axios from '../api';
import React, { useState, useEffect } from "react";
import Appointment from './Appointment';
import * as _ from 'lodash';

export default function AppointmentList(props) {
  const { days, selectedDayId, allAppointments, allInterviewers } = props;
  if (!days[selectedDayId]) return (<></>);
  const appointmentIdxs = days[selectedDayId].appointments;

  const appointments = appointmentIdxs
    .map(apptIdx => allAppointments[apptIdx])
    .map(appt => {
      let interviewData = null;
      if (appt.interview) {
        interviewData = { 
          interviewer: allInterviewers[appt.interview.interviewer]
        };
      }
      return _.merge({}, appt, { interview: interviewData });
    }
  );

  return appointments.map(appt => <Appointment key={appt.id} {...appt} />);
}