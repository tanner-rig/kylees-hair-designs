import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MenuItem, Menu } from "@material-ui/core";
import { FaBars } from "react-icons/fa";

import "./TopBar.scss";
import routes from "../../constants/routes";
import UIBoundary from "../ui-components/UIBoundary";
import { logoutUser } from "../../actions/userActions";

class TopBar extends Component {
  static propTypes = {
    router: PropTypes.object
  };

  state = {
    anchorEl: null
  };

  onTitleClick = () => {
    this.props.history.push(routes.home);
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="top-bar">
        <div className="tb-container">
          <span className="tb-left-links">
            <span className="tb-title" onClick={this.onTitleClick}>
              Kylee's Hair Designs
            </span>
            <span className="tb-desktop-only"></span>
          </span>
          {isLoggedIn && (
            <div>
              <FaBars onClick={this.handleClick} size={18} />
              <Menu
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem
                  onClick={() => {
                    this.handleClose();
                    this.props.history.push(routes.clients);
                  }}
                >
                  Manage Clients
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.handleClose();
                    this.props.history.push(routes.home);
                    this.props.logoutUser();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
}

export default connect(mapStateToProps, { logoutUser })(TopBar);
