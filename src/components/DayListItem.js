import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

function formatSpots(count) {
  if(count === 0) return "no spots remaining";
  else if(count === 1) return "1 spot remaining";
  else return `${count} spots remaining`;
  }

export default function DayListItem(props) {
  const DayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  })
  
  return (
  <li className={DayListItemClass} onClick={() => props.setDay(props.id)}>
    <h2>{props.name}</h2>
    <h3> {formatSpots(props.spots)}</h3>
  </li>
  );
}


