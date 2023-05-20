import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddTour from "../pages/Add-Tour.jsx";
import { BrowserRouter as Router } from "react-router-dom";

describe("Form works as expected", () => {
  it("submits the form with the given input values", () => {
    const handleSubmit = jest.fn();
    // const { getByLabelText, getByText } = render(
    //   <Login />
    // );
    render(
      <Router>
        <AddTour />
      </Router>
    );

    const email = screen.getByText("email");
    const password = screen.getByText("password");
    fireEvent.change(title, { target: { value: "John Doe" } });
    fireEvent.change(geust, { target: { value: "John123" } });

    const submitButton = screen.getByText("submit");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
