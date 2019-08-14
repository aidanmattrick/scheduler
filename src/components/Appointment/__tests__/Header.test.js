import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import Header from "../Header";

afterEach(cleanup);

describe('Header', () => {
  it("renders without crashing", () => {
    act(() => {
      render(<Header />)
    });
  });
});
