import React from "react";
import classnames from "classnames";

import "components/Button.scss";

export default function Button(props) {

  const buttonClass = classnames("button", {
    "button--danger": props.danger,
    "button--confirm": props.confirm
  });

  const tagProps = {};
  if (props.submit) tagProps.type = "submit";

  return (
   <button 
    {...tagProps}
    className={buttonClass}
    onClick={props.onClick}
    disabled={props.disabled}
    data-testid={props['data-testid']}
  >{props.children}
  </button>
  );
}
