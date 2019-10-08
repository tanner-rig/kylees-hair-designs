import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import routes from "../../constants/routes";
import { getClients } from "../../actions/clientsActions";
import "./clientsTable.scss";

class ClientsTable extends Component {
  render() {
    const { clients } = this.props;

    return (
      <div className="clients">
        <div className="clients-header">
          <div className="ch-name">Name</div>
          <div className="ch-phone">Phone</div>
          <div className="ch-email">Email</div>
          <div className="ch-contact">Contact Method</div>
          <div className="ch-allergies">Allergies</div>
          <div className="ch-waiver">Waiver</div>
          <div className="ch-history">Hair History</div>
          <div className="ch-notes">Notes</div>
        </div>
        {clients.map(client => {
          return (
            <Link
              className="client-row"
              key={client.clientId}
              to={`${routes.client}/${client.clientId}`}
            >
              <div className="client-name">{`${client.firstName} ${client.lastName}`}</div>
              <div className="client-phone">{client.phone}</div>
              <div className="client-email">{client.email}</div>
              <div className="client-contact">{client.contactMethod}</div>
              <div className="client-allergies">{client.allergies}</div>
              <div className="client-waiver">
                {client.waiver ? "Yes" : "No"}
              </div>
              <div className="client-history">{client.hairHistory}</div>
              <div className="client-notes">{client.notes}</div>
            </Link>
          );
        })}
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
)(ClientsTable);
