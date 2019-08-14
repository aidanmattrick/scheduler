import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import InterviewerList from "components/InterviewerList";

afterEach(cleanup);

describe('InterviewerList', () => {
  it("renders without crashing", () => {
    act(() => {
      render(<InterviewerList />)
    });
  });
});
