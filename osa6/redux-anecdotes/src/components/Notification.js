import { connect } from 'react-redux';
import React from 'react';

const Notification = (props) => {
  const { notification } = props;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  let component = null;
  if (notification.message) {
    component = (
      <div style={style}>
        {notification.message}
      </div>
    );
  }
  return component;
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(mapStateToProps)(Notification);
