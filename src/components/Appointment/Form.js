import React, { useState } from 'react';
import "components/Button.scss";
import Button from "../Button";
import InterviewerList from "../InterviewerList";



export default function Form(props) {
  const { student: initialStudent, interviewer: initialInterviewer } = (props.interview ? props.interview : {});
  // const initialStudent = props.interview.student;
  const initialInterviewerId = (initialInterviewer) ? initialInterviewer.id : null;
  const [studentName, setStudentName] = useState(initialStudent || '');
  const [interviewer, setInterviewer] = useState(initialInterviewerId);
  const [error, setError] = useState("");

  function validate() {
    if (studentName !== "") return true;
    setError("Student name cannot be blank");
    return false;
  }

  function reset() {
    setStudentName(initialStudent);
    setInterviewer(initialInterviewerId);
    props.onCancel();
  }

  function onSave(e) {
    if (validate()) props.onSave(studentName, interviewer);
    e.preventDefault();
    return false;
  }

  function onStudentNameChange(e) {
    setStudentName(e.target.value);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <form onSubmit={onSave} autoComplete="off">

        <section className="appointment__card-left">
          <section className="appointment__validation">{error}</section>

          <input
            onChange={onStudentNameChange}
            className="appointment__create-input text--semi-bold"
            name="name"
            value={studentName}
            data-testid="student-name-input"
            type="text"
            placeholder="Enter Student Name"
          />
          <InterviewerList interviewers={props.availableInterviewers} interviewer={interviewer} onChange={setInterviewer} />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger data-testid="appointment-form-cancel" onClick={reset} >Cancel</Button>
            <Button confirm submit data-testid="appointment-form-submit">Save</Button>
          </section>
        </section>
      </form>

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