import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";


export default function InterviewerListItem(props) {
  const InterviewerListItemClass = classnames("interviewer-list__item", {
    "interviewers__item--selected": props.selected,
  })

function showName() {if (props.selected) { return props.name }}

return (
  <li className={InterviewerListItemClass} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {showName()}
</li>
)
}