import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  return (
    <ul>
     {props.days.map((day) => {
       return (
         <DayListItem
          key={day.id}
          id={day.id}
           selected={day.id === props.selectedDayId}
           name={day.name}
           spots={day.spots}
           setDay={props.setDay}
         />
       );
     })}
    </ul>
  );
}