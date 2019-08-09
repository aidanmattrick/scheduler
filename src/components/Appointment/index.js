import Confirm from './Confirm';
import Empty from './Empty';
import Error from './Error';
import Form from './Form';
import Header from './Header';
import Show from './Show';
import Status from './Status';

import React, { useCallback } from "react";
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const ERROR = "ERROR";
const CREATE = "CREATE";
const EDIT = "EDIT";
const STATUS = "STATUS";



export default function Appointment(props) {
  const { id, time, interview, allInterviewers } = props;
  const visualMode = useVisualMode(interview ? SHOW : EMPTY);
  let view = null;
  if (visualMode.mode === EMPTY) {
    view = <Empty onAdd={() => visualMode.transition(CREATE)} />;
  } else if (visualMode.mode === SHOW) {
    view = <Show {...{interview}} />;
  } else if (visualMode.mode === CREATE) {
    view = <Form onCancel={() => visualMode.back()} {...{allInterviewers}} />
  } else if (visualMode.mode === CONFIRM) {
    view = null;
  } else if (visualMode.mode === ERROR) {
    view = null;
  } else if (visualMode.mode === EDIT) {
    view = null;
  } else if (visualMode.mode === STATUS) {
    view = null;
  }
  

  return (
    <article className="appointment">
      <Header time={time} />
      {view}
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