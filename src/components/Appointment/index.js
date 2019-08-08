import Confirm from './Confirm';
import Empty from './Empty';
import Error from './Error';
import Form from './Form';
import Header from './Header';
import Show from './Show';
import Status from './Status';

import React from "react";
import "./styles.scss";




export default function Appointment(props) {
  const { id, time, interview } = props;
  return (
    <article className="appointment">
      <Header time={time} />
      {(interview) ? <Show {...{interview}} /> : <Empty/>}
    </article>
  );
}

export { 
  Appointment,
  Confirm,
  Empty,
  Error,
  Form,
  Header,
  Show,
  Status,
};
// allows  you to type
/// import {Show } from './Appointment';
// instead of:  
// import Show from './Appointment/Show'