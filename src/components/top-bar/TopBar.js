import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './TopBar.scss';
import Button from '../ui-components/Button';
import routes from '../../constants/routes';
import UIBoundary from '../ui-components/UIBoundary';
import { logoutUser } from '../../actions/userActions';

class TopBar extends Component {
  static propTypes = {
    router: PropTypes.object
  }

  onTitleClick = () => {
    this.props.history.push(routes.home);
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="top-bar">
        <UIBoundary>
          <div className="tb-container">
            <span className="tb-left-links">
              <span className="tb-title" onClick={this.onTitleClick}>Kylee's Hair Designs</span>
              <span className="tb-desktop-only">
              </span>
            </span>
            {isLoggedIn && <Button
              variant="text"
              color="primary"
              onClick={this.props.logoutUser}
            >
              Sign out
            </Button>}
          </div>
        </UIBoundary>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
}

export default connect(mapStateToProps, {logoutUser})(TopBar);
