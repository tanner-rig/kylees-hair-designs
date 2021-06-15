import React, { Component } from "react";
import { connect } from "react-redux";
import { MdNoteAdd } from "react-icons/md";
import { find, isEmpty } from "lodash";
import { Button } from "@material-ui/core";

import routes from "../../constants/routes";
import AppointmentModal from "./appointmentModal";
import { AppointmentsTable } from "./appointmentsTable";
import {
  getAppointments,
  deleteAppointment,
} from "../../actions/appointmentsActions";
import { getClient } from "../../actions/clientsActions";
import Loader from "../ui-components/Loader";
import { convertToDateStamp } from "../../utils/dateUtil";

import "./appointments.scss";

class Appointments extends Component {
  state = {
    appointmentModalOpen: false,
    apptToDelete: "",
    clientId: "",
    currentAppt: null,
    loading: true,
    currentClient: {},
  };

  componentDidMount() {
    const params = window.location.href.split("/");
    const clientId = params[params.length - 1];

    if (clientId && clientId !== "appointments") {
      if (isEmpty(this.props.clients)) {
        this.props.getClient(clientId);
      } else {
        this.setState({
          currentClient: find(
            this.props.clients,
            (client) => client.clientId === clientId
          ),
        });
      }

      this.props.getAppointments(clientId).then(() => {
        this.setState({ clientId, loading: false });
      });
    } else {
      this.props.history.push(routes.clients);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.client !== this.props.client) {
      this.setState({ currentClient: this.props.client });
    }
  }

  editAppointment = (currentAppt) => {
    this.setState({ currentAppt, appointmentModalOpen: true });
  };

  showDeleteModal = (apptToDelete) => {
    this.setState({ apptToDelete });
  };

  deleteAppointment = () => {
    this.props.deleteAppointment(this.state.apptToDelete.appointmentId);
    this.setState({ apptToDelete: "" });
  };

  handleCloseAppointmentModal = () => {
    this.setState({ appointmentModalOpen: false, currentAppt: null });
  };

  handleOpenAppointmentModal = () => {
    this.setState({ appointmentModalOpen: true });
  };

  render() {
    const { appointments } = this.props;
    const { currentClient, apptToDelete } = this.state;

    const fullName =
      currentClient.firstName || currentClient.lastName
        ? `${currentClient?.firstName} ${currentClient?.lastName}`
        : "";

    return (
      <div className="appointments">
        <div className="appointments-actions">
          <div className="back-button" onClick={this.props.history.goBack}>
            {"< Back"}
          </div>
          <div
            className="add-appointment"
            onClick={this.handleOpenAppointmentModal}
          >
            Add appointment <MdNoteAdd />
          </div>
        </div>
        <div className="appt-client-name">{fullName}</div>
        {this.state.appointmentModalOpen && (
          <AppointmentModal
            open={this.state.appointmentModalOpen}
            closeModal={this.handleCloseAppointmentModal}
            clientId={this.state.clientId}
            appointment={this.state.currentAppt}
          />
        )}
        {this.state.loading ? (
          <Loader size={80} />
        ) : appointments.length > 0 ? (
          <AppointmentsTable
            appointments={appointments}
            editAppointment={this.editAppointment}
            deleteAppointment={this.showDeleteModal}
          />
        ) : (
          <div>No appointments for this client yet, add a new appointment</div>
        )}
        {!!apptToDelete.appointmentId && (
          <div className="modal-wrapper">
            <div className="delete-modal">
              <div
                style={{ marginBottom: 24 }}
              >{`Are you sure you want to delete the appointment on ${convertToDateStamp(apptToDelete?.date)} for ${currentClient?.firstName} ${currentClient?.lastName}?`}</div>
              <div>
                <Button
                  onClick={this.deleteAppointment}
                  color="primary"
                  variant="contained"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => this.setState({ apptToDelete: "" })}
                  color="primary"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appointments: state.appointments.appointmentsList,
    clients: state.clients.clientsList,
    client: state.clients.currentClient,
  };
}

export default connect(mapStateToProps, {
  getAppointments,
  deleteAppointment,
  getClient,
})(Appointments);
