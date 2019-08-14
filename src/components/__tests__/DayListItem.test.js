import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import DayListItem from "components/DayListItem";

afterEach(cleanup);

describe('DayListItem', () => {
  it("renders without crashing", () => {
    act(() => {
      render(<DayListItem />)
    });
  });
});
