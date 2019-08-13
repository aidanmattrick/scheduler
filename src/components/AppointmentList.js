import React from "react";
import Appointment from './Appointment';

export default function AppointmentList(props) {
  //these are the props we are passing into AppointmentList, but shouldn't this be defined at the parent component level? Or is that happening in line 26?
  const { day, bookInterview, removeInterview } = props; //allows you to use days instead of props.days
  if (!day) return (<></>);
  const {appointments, interviewers } = day;
  return (
    <>
      {appointments.map(appt => <Appointment key={appt.id} {...appt} {...{interviewers, bookInterview, removeInterview}} />)}
      <Appointment id="last" time="5pm" />
    </>
  );
}
