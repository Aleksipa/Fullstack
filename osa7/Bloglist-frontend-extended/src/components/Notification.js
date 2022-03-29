import React from "react";

function Notification({ notification }) {
  if (notification === null) {
    return null;
  }

  return <div className={notification.type}>{notification.message}</div>;
}

export default Notification;
