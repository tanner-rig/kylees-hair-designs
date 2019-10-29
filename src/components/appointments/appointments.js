import React, { Component } from "react";
import { connect } from "react-redux";
import { MdNoteAdd } from "react-icons/md";

import AppointmentModal from "./appointmentModal";
import { AppointmentsTable } from "./appointmentsTable";
import {
  getAppointments,
  deleteAppointment
} from "../../actions/appointmentsActions";

import "./appointments.scss";

class Client extends Component {
  state = {
    appointmentModalOpen: false,
    clientId: "",
    currentAppt: null
  };

  componentDidMount() {
    const params = window.location.href.split("/");
    const clientId = params[params.length - 1];

    this.setState({ clientId });

    if (clientId) {
      this.props.getAppointments(clientId);
    }
  }

  editAppointment = currentAppt => {
    this.setState({ currentAppt, appointmentModalOpen: true });
  };

  deleteAppointment = appointmentId => {
    this.props.deleteAppointment(appointmentId);
  };

  handleCloseAppointmentModal = () => {
    this.setState({ appointmentModalOpen: false, currentAppt: null });
  };

  handleOpenAppointmentModal = () => {
    this.setState({ appointmentModalOpen: true });
  };

  render() {
    const { appointments } = this.props;
    // back button
    // edit client
    // appointments
    // edit appointment
    return (
      <div className="appointments">
        <div className="appointments-actions">
          <div
            className="add-appointment"
            onClick={this.handleOpenAppointmentModal}
          >
            Add appointment <MdNoteAdd />
          </div>
          <AppointmentModal
            open={this.state.appointmentModalOpen}
            closeModal={this.handleCloseAppointmentModal}
            clientId={this.state.clientId}
            appointment={this.state.currentAppt}
          />
          {appointments.length > 0 ? (
            <AppointmentsTable
              appointments={appointments}
              editAppointment={this.editAppointment}
              deleteAppointment={this.deleteAppointment}
            />
          ) : (
            <div>
              No appointments for this client yet, add a new appointment
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appointments: state.appointments.appointmentsList
  };
}

export default connect(
  mapStateToProps,
  { getAppointments, deleteAppointment }
)(Client);
