import React, { Component } from "react";
import { connect } from "react-redux";

class Client extends Component {
  componentDidMount() {
    const params = window.location.href.split("/");
    const currentId = params[params.length - 1];

    this.setState({ currentId });

    // get appointments
  }

  render() {
    // back button
    // edit client
    // appointments
    // add appointment
    // edit appointment
    return <div className="client">Name of client</div>;
  }
}

function mapStateToProps(state) {
  return {
    clients: state.clients.clientsList
  };
}

export default connect(mapStateToProps)(Client);
