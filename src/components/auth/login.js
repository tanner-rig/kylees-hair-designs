import React, { Component } from "react";
import { connect } from "react-redux";
import { toLower } from "lodash";

import { loginUser, clearAuthErrors } from "../../actions/userActions";
import "./login.scss";
import Input from "../ui-components/Input";
import Button from "../ui-components/Button";
import { isExpired } from "../../utils/jwtUtils";
import routes from "../../constants/routes";

class Login extends Component {
  state = {
    password: "",
    passwordError: "",
    username: "",
    usernameError: "",
    submitting: false
  };

  componentDidMount() {
    this.props.clearAuthErrors();
    if (this.props.userToken && !isExpired(this.props.userToken)) {
      this.props.history.push(routes.dashboard);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userToken !== this.props.userToken) {
      this.props.history.push(routes.dashboard);
    }

    if (!prevProps.authError && this.props.authError) {
      this.setState({ submitting: false });
    }
  }

  onFormSubmit = e => {
    e.preventDefault();

    if (this.state.submitting) return;

    this.setState({ submitting: true });

    this.validateForm(err => {
      if (err) {
        return this.setState({ submitting: false });
      }

      // Log user in
      this.props.loginUser(this.state.username, this.state.password);
    });
  };

  onInputTextChange = (key, value) => {
    this.setState({
      [key]: value,
      [`${key}Error`]: ""
    });
  };

  validateForm = cb => {
    let error = "";

    // Validate username
    const username = this.state.username;
    if (!username) {
      error = " - this field is required";
      this.setState({ usernameError: error });
    } else {
      this.setState({ usernameError: "" });
    }

    // Validate password
    const password = this.state.password;
    if (!password) {
      error = " - this field is required";
      this.setState({ passwordError: error });
    } else {
      this.setState({ passwordError: "" });
    }

    cb(error);
  };

  renderErrors() {
    if (this.props.authError) {
      return <div className="si-error-text">{this.props.authError}</div>;
    }
  }

  render() {
    return (
      <div className="sign-in">
        <div className="si-title">Sign in to your account</div>
        <div className="si-form-container">
          <form className="si-form" onSubmit={this.onFormSubmit}>
            <Input
              label={`Username${this.state.usernameError}`}
              error={this.state.usernameError ? true : false}
              required={true}
              onChange={e =>
                this.onInputTextChange("username", toLower(e.target.value))
              }
              value={this.state.username}
            />
            <div className="si-input-container">
              <Input
                label={`Password${this.state.passwordError}`}
                type="password"
                error={this.state.passwordError ? true : false}
                required={true}
                onChange={e =>
                  this.onInputTextChange("password", e.target.value)
                }
                value={this.state.password}
              />
            </div>
            <div className="si-contain-actions">
              {this.renderErrors()}
              <Button
                disabled={this.state.submitting}
                loading={this.state.submitting}
                fullWidth={true}
                type="submit"
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authError: state.user.authError,
    userToken: state.user.token
  };
}

export default connect(
  mapStateToProps,
  { loginUser, clearAuthErrors }
)(Login);
