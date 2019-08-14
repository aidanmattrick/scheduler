import React from "react";

import { render, cleanup, act, fireEvent } from "@testing-library/react";

import Button from "components/Button";

afterEach(cleanup);

describe('Button', () => {
  it("renders without crashing", () => {
    render(<Button />);
  });

  it("handles onClick correctly", () => {
    const onClick = jest.fn();
    act(() => {
      const { getByText } = render(<Button onClick={onClick}>ButtonText</Button>);
      const button = getByText("ButtonText");
      fireEvent.click(button);
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
