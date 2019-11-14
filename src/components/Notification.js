import React from "react";
import "./Notification.css";

const Notification = ({ notification }) => {
  const { message, type } = notification;
  return <div className={`Notification ${type}`}>{message}</div>;
};

export default Notification;
