import React from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

import routes from "../../constants/routes";
import "./clientsTable.scss";

export const ClientsTable = (props) => {
  const { clients } = props;
  const sortedClients = cloneDeep(clients)?.sort((a, b) => {
    return a.firstName - b.firstName;
  });

  return (
    <div className="clients">
      <div className="clients-header">
        <div className="ch-name">Name</div>
        <div className="ch-phone">Phone</div>
        <div className="ch-email">Email</div>
        <div className="ch-allergies">Allergies</div>
        <div className="ch-waiver">Waiver</div>
        <div className="ch-history">Hair History</div>
        <div className="ch-notes">Notes</div>
        <div className="ch-actions" />
      </div>
      {sortedClients
        .map((client) => {
          return (
            <div className="client-table-row" key={client.clientId}>
              <div
                className="client-data"
                onClick={() =>
                  props.history.push(
                    `${routes.appointments}/${client.clientId}`
                  )
                }
              >
                <div className="ct-data-item client-name">{`${client.firstName} ${client.lastName}`}</div>
                <div className="ct-data-item client-phone">
                  <a
                    href={`tel:${client.phone}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {client.phone &&
                      `${client.phone}${
                        client.contactMethod === "text"
                          ? "* (text)"
                          : client.contactMethod === "call"
                          ? "* (call)"
                          : ""
                      }`}
                  </a>
                </div>
                <div className="ct-data-item client-email">
                  <a
                    href={`mailto:${client.email}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {client.email &&
                      `${client.email}${
                        client.contactMethod === "email" ? "*" : ""
                      }`}
                  </a>
                </div>
                <div className="ct-data-item client-allergies">
                  {client.allergies}
                </div>
                <div className="ct-data-item client-waiver">
                  {client.waiver ? "Yes" : "No"}
                </div>
                <div className="ct-data-item client-history">
                  {client.hairHistory}
                </div>
                <div className="ct-data-item client-notes">{client.notes}</div>
              </div>
              <div className="client-actions">
                <FaPencilAlt
                  onClick={() => props.editClient(client)}
                  className="row-action"
                  size={16}
                />
                |
                <FaTrash
                  onClick={() => props.deleteClient(client)}
                  className="row-action"
                  size={16}
                />
              </div>
            </div>
          );
        })}
      <div className="asterisk-info">* preferred contact method</div>
    </div>
  );
};
