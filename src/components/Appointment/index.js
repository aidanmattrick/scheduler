import Confirm from './Confirm';
import Empty from './Empty';
import Error from './Error';
import Form from './Form';
import Header from './Header';
import Show from './Show';
import Status from './Status';

import React from "react";
import "./styles.scss";




export default function Appointment(props) {
  const slot = (props.interview) ? <Show interview={props.interview}/> : <Empty/>;
  return (
    <article className="appointment">
      <Header time={props.time} />
      {slot}
    </article>
  );
}

export { Confirm };
export { Empty };
export { Error };
export { Form };
export { Header };
export { Show };
export { Status };
export { Appointment };

// allows  you to type
/// import {Show } from './Appointment';
// instead of:  
// import Show from './Appointment/Show'