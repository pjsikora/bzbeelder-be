import React, { Component } from "react";
import axios from "axios";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  
  handleSubmit = async e => {
    const { email, password } = this.state;
    const login = await axios.post("http://localhost:4040/api/auth/login", {
      email,
      password
    });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
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
          <div class="form-group loginForm__formGroup">
            <div class="icon-login_icon loginForm__icon" />
            <input
              autofocus=""
              className="form-control loginForm__formControl"
              onChange={this.handleChange}
              //   id="inputEmail"
              placeholder="Email address"
              name="login"
            />
          </div>
          <div className="form-group loginForm__formGroup">
            <div className="icon-password_icon loginForm__icon" />
            <input
              class="form-control loginForm__formControl"
              //   id="inputPassword"
              onChange={this.handleChange}
              placeholder="Password"
              type="password"
              name="password"
            />
          </div>
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

export default LoginForm;
