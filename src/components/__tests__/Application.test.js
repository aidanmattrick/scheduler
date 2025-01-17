import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("renders without crashing", () => {
    act(() => {
      render(<Application />)
    });
  });
});
