import React from "react";
import "components/InterviewersList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  interviewers: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
  return (
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">


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