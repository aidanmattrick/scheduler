import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, appointments } = props;
  return (
    <ul>
     {Object.values(days).map((day) => {
        let emptySpotCount = day.appointments
          .map(apptIdx => appointments[apptIdx])
          .filter(appt => !appt.interview)
          .length;
        return (
         <DayListItem
          key={day.id}
          id={day.id}
           selected={day.id === props.selectedDayId}
           name={day.name}
           spots={emptySpotCount}
           setDay={props.setDay}
         />
       );
     })}
    </ul>
  );
}