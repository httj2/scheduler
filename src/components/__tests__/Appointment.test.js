// We are rendering `<Application />` down below, so we need React.createElement
import React from "react";
/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

// import the componenet we are testing
import Appointment from "components/Appointment/index";


describe("Appointment", () => {
  xit("renders without crashing", () => {
    render(<Appointment />);
  });





});
