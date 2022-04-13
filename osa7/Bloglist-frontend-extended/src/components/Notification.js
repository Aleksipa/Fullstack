import { useSelector } from "react-redux";
import React from "react";
import { Alert } from "@material-ui/lab";

function Notification() {
  const notification = useSelector((state) => state.notification);

  return (
    <div>{notification.message && <Alert>{notification.message}</Alert>}</div>
  );
}

export default Notification;
