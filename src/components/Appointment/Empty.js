import React from "react";

export default function Empty(props){
  // const EmptyClass = classnames("empty__item", {
  //   "day-list__item--selected": props.selected,
  //   "day-list__item--full": props.spots === 0,
  // })

  return (
  <main className="appointment__add">
  <img
    className="appointment__add-button"
    src="images/add.png"
    onClick={props.onAdd}
    alt="Add"
  />
</main>
  );
}