import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import Status from "../Status";

afterEach(cleanup);

describe('Status', () => {
  it("renders without crashing", () => {
    act(() => {
      render(<Status />)
    });
  });
});
