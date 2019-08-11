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
const SAVING = "SAVING";
const DELETING = "DELETING";


export default function Appointment(props) {
  const { id, time, interview, availableInterviewers, bookInterview, removeInterview } = props;
  const visualMode = useVisualMode(interview ? SHOW : EMPTY);


  const onSave = function(name, interviewer) {
    return new Promise((resolve, reject) => {
      visualMode.transition(SAVING);
      resolve();
    }).then(bookInterview(id, {
      student: name,
      interviewer
    }))
    .then(() => visualMode.transition(SHOW));
  };

  const onDelete = function(id) {
    return new Promise((resolve, reject) => {
      visualMode.transition(DELETING);
      resolve();
    })
    .then(removeInterview(id))
    .then(() => visualMode.transition(SHOW));
  };

  let view = null;
  if (visualMode.mode === EMPTY) {
    view = <Empty onAdd={() => visualMode.transition(CREATE)} />;
  } else if (visualMode.mode === SHOW) {
    view = <Show {...{interview}} />;
  } else if (visualMode.mode === CREATE) {
    view = <Form onCancel={() => visualMode.back()} onSave={onSave} {...{availableInterviewers}} />
  } else if (visualMode.mode === CONFIRM) {
    view = null;
  } else if (visualMode.mode === ERROR) {
    view = null;
  } else if (visualMode.mode === EDIT) {
    view = null;
  } else if (visualMode.mode === SAVING) {
    view = <Status message="Saving..."/>;
  } else if(visualMode.mode === DELETING) {
    view = <Status message="Deleting..."/>
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