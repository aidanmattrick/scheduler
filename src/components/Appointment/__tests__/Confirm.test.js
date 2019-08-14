import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import Confirm from "../Confirm";

afterEach(cleanup);

describe('Confirm', () => {
  it("renders without crashing", () => {
    act(() => {
      render(<Confirm />)
    });
  });
});
