import React, { useState, useEffect } from "react";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";

interface CurrentStatus {
  state: string;
  code: number;
  stateTime: string;
}

const steps = [
  "Shipment Created",
  "Picked Up",
  "InTransit",
  "OutDelivery",
  "Delivered",
  "Returned",
];

const statusCodeToStepIndex: Record<number, number> = {
  24: 1, // Picked Up
  41: 3, // Out for Delivery
  45: 4, // Delivered
  46: 5, // Returned
};

const CustomStepper = ({ currentStatus }: { currentStatus: CurrentStatus }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check window width and set isMobile flag
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Mobile screens are less than 768px
    };

    checkMobile(); // Check on initial render
    window.addEventListener("resize", checkMobile); // Add event listener for window resizing

    return () => {
      window.removeEventListener("resize", checkMobile); // Clean up on unmount
    };
  }, []);
  
  const activeStep = statusCodeToStepIndex[currentStatus.code] || 0;

  const formatDateToDay = (timestamp: string) =>
    new Date(timestamp).toLocaleDateString("en-US", {
      weekday: "short", // Abbreviated weekday
      month: "short", // Abbreviated month
      day: "numeric", // Day as number
    });

  let stateTime = formatDateToDay(currentStatus.stateTime);

  return (
    <div className="p-4 max-w-[600px] mx-auto text-center dark:text-white">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        orientation={isMobile ? "vertical" : "horizontal"} // Change orientation based on screen size
      >
        {steps.map((label, index) => (
          <Step className=" my-2 px-5" key={label}>
        <div className="data ">
        <StepLabel className="flex flex-col items-start   justify-center">
              <div className="flex flex-col ">
                <span className="font-bold text-teal-600">{label}</span>
                {activeStep === index && (
                  <Typography variant="caption" className="mt-2 text-sm text-teal-600">
                    <h2>{stateTime}</h2>
                  </Typography>
                )}
              </div>
            </StepLabel>
        </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CustomStepper;
