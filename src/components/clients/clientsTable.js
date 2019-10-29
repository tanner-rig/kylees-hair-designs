import React from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import routes from "../../constants/routes";
import "./clientsTable.scss";

export const ClientsTable = props => {
  const { clients } = props;

  return (
    <div className="clients">
      <div className="clients-header">
        <div className="ch-actions" />
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
            to={`${routes.appointments}/${client.clientId}`}
          >
            <div className="client-actions">
              <MdEdit onClick={() => props.editClient(client)} />
              <FaTrash onClick={() => props.deleteClient(client.clientId)} />
            </div>
            <div className="client-name">{`${client.firstName} ${client.lastName}`}</div>
            <div className="client-phone">{client.phone}</div>
            <div className="client-email">{client.email}</div>
            <div className="client-contact">{client.contactMethod}</div>
            <div className="client-allergies">{client.allergies}</div>
            <div className="client-waiver">{client.waiver ? "Yes" : "No"}</div>
            <div className="client-history">{client.hairHistory}</div>
            <div className="client-notes">{client.notes}</div>
          </Link>
        );
      })}
    </div>
  );
};
