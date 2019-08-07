import React from "react";
import "components/InterviewersList.scss";
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {
  return (
<section class="interviewers">
  <h4 class="interviewers__header text--light">Interviewer</h4>
  <ul class="interviewers__list">


  {props.interviewers.map((interviewer) => {
    return (
    <InterviewerListItem
    key={interviewer.name}
    selected={interviewer.id === props.interviewer}
    avatar={interviewer.avatar}
    name={interviewer.name}
    setInterviewer={(event) => props.onChange(interviewer.id)}
    />
    );
})}
  </ul>
</section>
  )
}