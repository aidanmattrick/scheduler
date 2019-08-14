import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import Empty from "../Empty";

afterEach(cleanup);

describe('Empty', () => {
  it("renders without crashing", () => {
    act(() => {
      render(<Empty />)
    });
  });
});
