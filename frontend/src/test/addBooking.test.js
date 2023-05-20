import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserBooking from "../pages/UserBookings";
import { BrowserRouter as Router } from "react-router-dom";

describe("Form works as expected", () => {
  it("submits the form with the given input values", () => {
    const handleSubmit = jest.fn();
    // const { getByLabelText, getByText } = render(
    //   <Login />
    // );
    render(
      <Router>
        <UserBooking />
      </Router>
    );

    const guestSize = screen.getByText("guestSize");
    const phone = screen.getByText("phone");
    fireEvent.change(phone, { target: { value: "0760986453" } });
    fireEvent.change(guestSize, { target: { value: "5" } });

    const submitButton = screen.getByText("submit");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
