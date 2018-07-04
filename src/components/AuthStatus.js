import React from "react";
import PropTypes from "prop-types";

export default class Logout extends React.Component {
  render() {
    const { onLogoutClick } = this.props;

    if (this.props.isAuthenticated) {
      return (
        <button onClick={() => onLogoutClick()} className="btn btn-primary">
          Logout, {this.props.username}
        </button>
      );
    } else {
      return <p>{this.props.username}</p>;
    }
  }
}

Logout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string,
  onLogoutClick: PropTypes.func.isRequired
};
