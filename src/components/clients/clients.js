import React, { Component } from "react";
import { connect } from "react-redux";
import { MdPersonAdd } from "react-icons/md";

import { getClients, deleteClient } from "../../actions/clientsActions";
import { ClientsTable } from "./clientsTable";
import ClientModal from "./clientModal";
import Loader from "../ui-components/Loader";

import "./clients.scss";

class Clients extends Component {
  state = {
    clientModalOpen: false,
    currentClient: null,
    loading: true
  };

  componentDidMount() {
    this.props.getClients().then(() => {
      this.setState({ loading: false });
    });
  }

  editClient = currentClient => {
    this.setState({ currentClient, clientModalOpen: true });
  };

  deleteClient = clientId => {
    this.props.deleteClient(clientId);
  };

  handleCloseClientModal = () => {
    this.setState({ clientModalOpen: false, currentClient: null });
  };

  handleOpenClientModal = () => {
    this.setState({ clientModalOpen: true });
  };

  render() {
    const { clients } = this.props;

    return (
      <div className="clients-dashboard">
        <div className="clients-actions">
          <div className="add-client" onClick={this.handleOpenClientModal}>
            Add client <MdPersonAdd />
          </div>
        </div>
        {this.state.clientModalOpen && (
          <ClientModal
            open={this.state.clientModalOpen}
            closeModal={this.handleCloseClientModal}
            client={this.state.currentClient}
          />
        )}
        {this.state.loading ? (
          <Loader size={80} />
        ) : clients.length > 0 ? (
          <ClientsTable
            clients={clients}
            editClient={this.editClient}
            deleteClient={this.deleteClient}
          />
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

export default connect(mapStateToProps, { getClients, deleteClient })(Clients);
