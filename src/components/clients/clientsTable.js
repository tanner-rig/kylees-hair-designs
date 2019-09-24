import React, { Component } from "react";
import { connect } from "react-redux";

import { getClients } from "../../actions/clientsActions";

class ClientsTable extends Component {
  render() {
    const { clients } = this.props;

    console.log((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1));

    return (
      <div className="clients">
        {clients.map(client => {
          return (
            <div style={{ border: '1px solid black'}}>
              {client.firstName}
            </div>
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
