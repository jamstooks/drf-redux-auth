import React from "react";
import PropTypes from "prop-types";

export default class Login extends React.Component {
  render() {
    const { errorMessage } = this.props;

    let error = [];
    if (errorMessage !== undefined) {
      if (Array.isArray(errorMessage))
        errorMessage.forEach(m => error.push(<p>{m}</p>));
      else error.push(<p>{errorMessage}</p>);
    }

    return (
      <div>
        <input
          type="text"
          ref="username"
          className="form-control"
          placeholder="Username"
        />
        <input
          type="password"
          ref="password"
          className="form-control"
          placeholder="Password"
        />
        <button onClick={event => this.handleClick(event)}>Login</button>

        {error}
      </div>
    );
  }

  handleClick(event) {
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = {
      username: username.value.trim(),
      password: password.value.trim()
    };
    this.props.onLoginClick(creds);
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};
