import React from "react";
import { Link } from "react-router-dom";

import routes from "../../constants/routes";
import "./clientsTable.scss";

export const ClientsTable = props => {
  const { clients } = props;

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
        <div className="ch-actions" />
      </div>
      {clients.map(client => {
        return (
          <div className="client-table-row" key={client.clientId}>
            <Link
              className="client-data"
              to={`${routes.appointments}/${client.clientId}`}
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
            <div className="client-actions">
              <div
                onClick={() => props.editClient(client)}
                className="row-action"
              >
                edit
              </div>
              |
              <div
                onClick={() => props.deleteClient(client.clientId)}
                className="row-action"
              >
                delete
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
