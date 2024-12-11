import React from "react";
import { Typography } from "@mui/material";

// Helper function to format the date
const formatDateToDay = (timestamp: string) =>
  new Date(timestamp).toLocaleDateString("en-US", {
    weekday: "short", // Abbreviated weekday
    month: "short", // Abbreviated month
    day: "numeric", // Day as number
  });

interface OrderStatus {
  state: string;
  code: number;
  stateTime: string;
}

const steps = [
  "Shipment Created",
  "Picked Up",
  "In Transit",
  "Out for Delivery",
  "Delivered",
  "Returned",
];

// This is a sample order history. Replace it with actual data or an API call
const orderHistory: OrderStatus[] = [
  {
    state: "Picked Up",
    code: 24,
    stateTime: "2024-12-09T12:47:06.256Z",
  },
  {
    state: "In Transit",
    code: 30,
    stateTime: "2024-12-10T13:47:06.256Z",
  },
  {
    state: "Out for Delivery",
    code: 41,
    stateTime: "2024-12-10T14:47:06.256Z",
  },
  {
    state: "Delivered",
    code: 45,
    stateTime: "2024-12-11T10:47:06.256Z",
  },
];

// Helper function to filter order history by the last two days
const getRecentStatus = (orderHistory: OrderStatus[]) => {
  const twoDaysAgo = new Date().getTime() - 2 * 24 * 60 * 60 * 1000; // Get timestamp of two days ago
  return orderHistory.filter(
    (order) => new Date(order.stateTime).getTime() >= twoDaysAgo
  );
};

const OrderTracker = () => {
  const recentOrderHistory = getRecentStatus(orderHistory);

  return (
    <div className="p-4 max-w-[600px] mx-auto">
      <div className="space-y-4">
        {recentOrderHistory.map((order, index) => (
          <div key={index} className="flex flex-col items-start">
            <div className="flex flex-row items-center space-x-2">
              <span className="font-bold text-teal-600">{order.state}</span>
              <Typography variant="caption" className="text-sm text-teal-600">
                {formatDateToDay(order.stateTime)}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracker;
