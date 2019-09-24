import React, { Component } from "react";
import { connect } from "react-redux";
import { MdPersonAdd } from "react-icons/md";

import { getClients, createClient } from "../../actions/clientsActions";
import ClientsTable from "../clients/clientsTable";
import ClientModal from "../clients/clientModal";

import "./adminDashboard.scss";

class AdminDashboard extends Component {
  state = {
    clientModalOpen: false
  };

  handleCloseClientModal = () => {
    this.setState({ clientModalOpen: true });
  };

  handleOpenClientModal = () => {
    this.setState({ clientModalOpen: false });
  };

  render() {
    const { clients } = this.props;

    return (
      <div className="admin-dashboard">
        <div className="add-client" onClick={this.handleOpenClientModal}>
          Add client <MdPersonAdd />
        </div>
        <ClientModal
          open={this.state.clientModalOpen}
          closeModal={this.handleCloseClientModal}
        />
        {clients.length > 0 ? (
          <ClientsTable />
        ) : (
          <div>No clients yet, add a new client</div>
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
  { getClients, createClient }
)(AdminDashboard);
