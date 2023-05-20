import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddVehicle from "../pages/Add-Vehicle";
import { BrowserRouter as Router } from "react-router-dom";

describe("Form works as expected", () => {
  it("submits the form with the given input values", () => {
    const handleSubmit = jest.fn();
    // const { getByLabelText, getByText } = render(
    //   <Login />
    // );
    render(
      <Router>
        <AddVehicle />
      </Router>
    );

    const number = screen.getByText("number");
    const type = screen.getByText("type");
    fireEvent.change(number, { target: { value: "BA-3487" } });
    fireEvent.change(type, { target: { value: "Car" } });

    const submitButton = screen.getByText("submit");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
