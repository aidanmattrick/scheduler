import React from 'react';
import "components/Button.scss";
import Button from "../Button";
import "./styles.scss";

export default function Confirm(props){
  // const buttonClass = classnames("button", {
  //   "button--danger": props.danger
  // });
  return (
<main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">{props.message}</h1>
  <section className="appointment__actions">
    <Button danger
    onClick={props.onCancel}
    >
    Cancel
    </Button>
    <Button danger
    onClick={props.onConfirm}
    >
      Confirm
    </Button>
  </section>
</main>
  );
}