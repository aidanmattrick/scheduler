import React, { useState } from 'react';
import "components/Button.scss";
import Button from "../Button";
import InterviewerList from "../InterviewerList";



export default function Form(props) {
  const { student: initialStudent, interviewer: initialInterviewer } = (props.interview ? props.interview : {});
  const initialInterviewerId = (initialInterviewer) ? initialInterviewer.id : null;
  const [studentName, setStudentName] = useState(initialStudent);
  const [interviewer, setInterviewer] = useState(initialInterviewerId);

  function reset() {
    setStudentName(initialStudent);
    setInterviewer(initialInterviewerId);
    props.onCancel();
  }

  function onSave(){
    props.onSave(studentName, interviewer); 
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form 
    onSubmit={event => event.preventDefault()}
    autoComplete="off">
      <input 
        onChange={(event) => setStudentName(event.target.value)}
        className="appointment__create-input text--semi-bold"
        name="name"
        value={studentName}
        type="text"
        placeholder="Enter Student Name"
      />
    </form>
    <InterviewerList interviewers={props.availableInterviewers} interviewer={interviewer} onChange={setInterviewer}/>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger
        onClick={reset}
      >Cancel
      </Button>
      <Button confirm
      onClick={onSave}
      >Save
      </Button>
    </section>
  </section>
</main>
  );
}




// <main>
// <input
//   value={name}
//   onChange={(event) => setName(event.target.value)}
//   placeholder="Enter Student Name"
// />
// <h1>Hello, {name}.</h1>
// </main>