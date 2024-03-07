import React from "react";
import { FaTrash } from "react-icons/fa";

import { convertToDateStamp, convertToStandard } from "../../utils/dateUtil";

import "./appointmentsTable.scss";

export const AppointmentsTable = (props) => {
  const { appointments } = props;

  return (
    <div className="appointments-table">
      <div className="appointments-header">
        <div className="ah-service">Service</div>
        <div className="ah-date">Date</div>
        <div className="ah-time">Time</div>
        <div className="ah-amount">Amount charged</div>
        <div className="ah-tip">Tip</div>
        <div className="ah-discount">Discount</div>
        <div className="ah-notes">Notes</div>
        <div className="ah-status">Status</div>
        <div className="ah-actions" />
      </div>
      {appointments
        .sort((a, b) => {
          return a.date - b.date;
        })
        .map((appointment) => {
          return (
            <div className="appointment-row" key={appointment.appointmentId}>
              <div
                className="appointment-data"
                onClick={() => props.editAppointment(appointment)}
              >
                <div className="at-data-item appointment-service">
                  {appointment.service}
                </div>
                <div className="at-data-item appointment-date">
                  {convertToDateStamp(appointment.date)}
                </div>
                <div className="at-data-item appointment-time">
                  {convertToStandard(appointment.time)}
                </div>

                <div className="at-data-item appointment-amount">
                  {appointment.amountCharged}
                </div>
                <div className="at-data-item appointment-tip">
                  {appointment.tip}
                </div>
                <div className="at-data-item appointment-discount">
                  {appointment.discountAmount && appointment.discountAmount > 0
                    ? "Yes"
                    : "No"}
                </div>
                <div className="at-data-item appointment-notes">
                  {appointment.notes}
                </div>
                <div className="at-data-item appointment-status">
                  {appointment.apptStatus}
                </div>
              </div>
              <div className="appointment-actions">
                <FaTrash
                  className="row-actions"
                  onClick={() => props.deleteAppointment(appointment)}
                  size={16}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};
