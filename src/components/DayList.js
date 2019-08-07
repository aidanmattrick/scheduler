import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  return (
    <ul>
     {props.days.map((day) => {
       return (
         <DayListItem
          key={day.name}
           selected={day.name === props.day}
           name={day.name}
           spots={day.spots}
           setDay={props.setDay}
         />
       );
     })}
    </ul>
  );
}