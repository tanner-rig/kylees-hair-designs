import React from "react";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import "./appointmentsTable.scss";

export const AppointmentsTable = props => {
  const { appointments } = props;

  return (
    <div className="appointments">
      <div className="appointments-header">
        <div className="ah-actions" />
        <div className="ah-status">Status</div>
        <div className="ah-date">Date</div>
        <div className="ah-time">Time</div>
        <div className="ah-service">Service</div>
        <div className="ah-amount">Amount</div>
        <div className="ah-discount">Discount</div>
        <div className="ah-tip">Tip</div>
        <div className="ah-notes">Notes</div>
      </div>
      {appointments.map(appointment => {
        return (
          <div className="appointment-row" key={appointment.appointmentId}>
            <div className="appointment-actions">
              <MdEdit onClick={() => props.editAppointment(appointment)} />
              <FaTrash
                onClick={() =>
                  props.deleteAppointment(appointment.appointmentId)
                }
              />
            </div>
            <div className="appointment-status">{appointment.apptStatus}</div>
            <div className="appointment-date">{appointment.date}</div>
            <div className="appointment-time">{appointment.time}</div>
            <div className="appointment-service">{appointment.service}</div>
            <div className="appointment-amount">{appointment.amountPaid}</div>
            <div className="appointment-discount">
              {appointment.discountAmount ? "Yes" : "No"}
            </div>
            <div className="appointment-tip">{appointment.tip}</div>
            <div className="appointment-notes">{appointment.notes}</div>
          </div>
        );
      })}
    </div>
  );
};
