import React from "react";

export default function Header(props) {
  //  Do I need to specify time:String for props? 
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">
        {props.time}
      </h4>
      <hr className="appointment__separator" />
    </header>
  );
}
