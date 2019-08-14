import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import Appointment from "../index";

afterEach(cleanup);

describe('index', () => {
  it("renders without crashing", () => {
    act(() => {
      render(<Appointment />)
    });
  });
});
