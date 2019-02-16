import React, { Component } from "react";
import { connect } from 'react-redux';
// import axios from "axios";
import {changeAuth} from '../store/AuthActions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.dispatchLogin({email, password})
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    const isError = false;
    const errorMsg = (
      <div class="loginForm__error">
        <span class="icon-validation_alert-triangle" />
        Please verify your email and password
      </div>
    );

    return (
      <div className="loginForm__keeper animated fadeInUp">
        <form
          className="loginForm__form text-center"
          onSubmit={this.handleSubmit}
        >
          <h1 className="h3 loginForm__header">
            Hello! <br />
            Sign in to get started{" "}
          </h1>
          <div className="form-group loginForm__formGroup">
            <div className="icon-login_icon loginForm__icon" />
            <input
              autoFocus=""
              className="form-control loginForm__formControl"
              onChange={this.handleChange}
              placeholder="Email address"
              name="email"
            />
          </div>
          <div className="form-group loginForm__formGroup">
            <div className="icon-password_icon loginForm__icon" />
            <input
              className="form-control loginForm__formControl"
              onChange={this.handleChange}
              placeholder="Password"
              type="password"
              name="password"
            />
          </div>
          {this.props.authState.loginError && errorMsg}
          <div className="loginForm__forgotPassword">
            <span>Forgot password</span>
          </div>
          <input
            className="btn btn-lg btn-primary btn-block loginForm__submitButton"
            type="submit"
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authState: state.auth };
}

const mapDispatchToProps = dispatch => ({
  dispatchLogin: loginData => {
    dispatch(changeAuth(loginData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
