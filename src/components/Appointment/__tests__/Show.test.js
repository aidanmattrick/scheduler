import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import Show from "../Show";

afterEach(cleanup);

describe('Show', () => {
  it("renders without crashing", () => {
    act(() => {
      render(<Show />)
    });
  });
});
