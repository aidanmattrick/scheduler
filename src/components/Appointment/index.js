import Confirm from './Confirm';
import Empty from './Empty';
import Error from './Error';
import Form from './Form';
import Header from './Header';
import Show from './Show';
import Status from './Status';

import React from "react";
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const FORM = "FORM";
const SAVING = "SAVING";
const DELETING = "DELETING";


export default function Appointment(props) {
  const { id, time, interview, availableInterviewers, bookInterview, removeInterview } = props;
  const visualMode = useVisualMode(interview ? SHOW : EMPTY);


  const onSave = function(name, interviewer) {
    visualMode.transition(SAVING);
    bookInterview(id, {
      student: name,
      interviewer
    })
      .then(() => visualMode.transition(SHOW, true))
      .catch(error => visualMode.transition(ERROR_SAVE, true));
  };

  const onConfirmDelete = function() {
    visualMode.transition(DELETING, true);
    removeInterview(id)
      .then(() => visualMode.transition(EMPTY, true))
      .catch(error => visualMode.transition(ERROR_DELETE, true));
  };

  const onEdit = function() {
    visualMode.transition(FORM);
  }

  const onDelete = function() {
    visualMode.transition(CONFIRM);
  }

  const onCancel = function() {
    visualMode.back();
  }

  let view = null;
  if (visualMode.mode === EMPTY) {
    view = <Empty onAdd={() => visualMode.transition(FORM)} />;
  } else if (visualMode.mode === SHOW) {
    view = <Show {...{interview, onDelete, onEdit}} />;
  } else if (visualMode.mode === FORM) {
    view = <Form {...{availableInterviewers, onSave, onCancel, interview}} />
  } else if (visualMode.mode === CONFIRM) {
    view = <Confirm message="Are you sure you want to delete this appointment?" onCancel={onCancel} onConfirm={onConfirmDelete} />;
  } else if (visualMode.mode === ERROR_SAVE) {
    view = <Error message="Could not update appointment." onClose={onCancel} />;
  } else if (visualMode.mode === ERROR_DELETE) {
    view = <Error message="Could not cancel appointment." onClose={onCancel} />;
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