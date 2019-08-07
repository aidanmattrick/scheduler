import React from "react";

export default function Status(props){
  return (
<main classNames="appointment__card appointment__card--status">
  <img
    classNames="appointment__status-image"
    src="images/status.png"
    alt="Loading"
  />
  <h1 classNames="text--semi-bold">{props.message}</h1>
</main>
  );
}

