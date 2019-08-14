import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import Error from "../Error";

afterEach(cleanup);

describe('Error', () => {
  it("renders without crashing", () => {
    act(() => {
      render(<Error />)
    });
  });
});
