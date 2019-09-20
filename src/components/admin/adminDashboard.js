import React, { Component } from "react";
import { connect } from "react-redux";

import { getClients } from "../../actions/clientsActions";
import ClientsTable from "../clients/clientsTable";

class AdminDashboard extends Component {
  render() {
    const { clients } = this.props;


    return (
      <div className="admin-dashboard">
        {clients.length > 0 ? (
          <ClientsTable clients={clients} />
        ) : (
          <div>No clients yet, click to add</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clients: state.clients.clientsList
  };
}

export default connect(
  mapStateToProps,
  { getClients }
)(AdminDashboard);
