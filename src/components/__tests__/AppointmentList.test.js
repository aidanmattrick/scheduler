import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import AppointmentList from "components/AppointmentList";

afterEach(cleanup);

describe('AppointmentList', () => {
  it("renders without crashing", () => {
    act(() => {
      render(<AppointmentList />)
    });
  });
});
