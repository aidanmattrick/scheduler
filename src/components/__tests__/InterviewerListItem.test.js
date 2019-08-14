import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import InterviewerListItem from "components/InterviewerListItem";

afterEach(cleanup);

describe('InterviewerListItem', () => {
  it("renders without crashing", () => {
    act(() => {
      render(<InterviewerListItem />)
    });
  });
});
