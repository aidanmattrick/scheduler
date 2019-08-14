import React from "react";

import { render, cleanup, act, fireEvent } from "@testing-library/react";

import Form from "../Form";

afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  function renderForm(props = {}) {
    const { getByTestId, getByText, queryByText } = render(<Form availableInterviewers={interviewers} {...props} />);
    const studentNameInput = getByTestId("student-name-input");
    const appointmentFormSubmitButton = getByTestId("appointment-form-submit");
    const clickSubmit = () => fireEvent.click(appointmentFormSubmitButton);
    return { studentNameInput, getByTestId, getByText, appointmentFormSubmitButton, clickSubmit, queryByText };
  }

  it("renders without crashing", () => {
    renderForm();
  });

  it("renders without student name if not provided", () => {
    const { studentNameInput } = renderForm();
    expect(studentNameInput).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { studentNameInput } = renderForm({ interview: { student: "Lydia Miller-Jones" } });
    expect(studentNameInput).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText, clickSubmit } = renderForm({ onSave });
    clickSubmit();
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn();
    const { queryByText, clickSubmit } = renderForm({ onSave, interview: { student: "Lydia Miller-Jones" } });
    clickSubmit();
    expect(queryByText(/student name cannot be blank/i)).not.toBeInTheDocument();
    //expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
  
});