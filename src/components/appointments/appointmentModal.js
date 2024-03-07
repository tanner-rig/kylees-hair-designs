import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  FormControl,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { convertToUnix } from "../../utils/dateUtil";
import Loader from "../ui-components/Loader";
import {
  createAppointment,
  updateAppointment,
} from "../../actions/appointmentsActions";
import v from "../../styles/variables";

const dialogTitleStyle = {
  borderBottom: `1px solid ${v.colorBlack15}`,
  position: "sticky",
  top: 0,
  background: v.colorWhite,
  zIndex: 1,
};

const dialogActionsStyle = {
  borderTop: `1px solid ${v.colorBlack15}`,
  position: "sticky",
  bottom: 0,
  background: v.colorWhite,
  zIndex: 1,
};

class AppointmentModal extends Component {
  state = {
    appointment: {
      amountCharged: "",
      amountPaid: "",
      apptStatus: "",
      date: null,
      discountAmount: "",
      discountType: "",
      duration: "",
      followUpDate: "",
      followUpTime: "",
      location: "Home salon",
      milesDriven: "",
      notes: "",
      productUsed: "",
      retailItemsAmount: "",
      retailItemsSold: "",
      service: "",
      time: "",
      tip: "",
      savingAppointment: false,
    },
  };

  componentDidMount() {
    if (this.props.appointment) {
      this.setState({
        appointment: this.props.appointment,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.appointment !== this.props.appointment) {
      this.setState({
        appointment: this.props.appointment,
      });
    }
  }

  handleAppointmentSubmit = () => {
    this.setState({ savingAppointment: true });

    if (this.props.appointment) {
      this.props
        .updateAppointment({
          ...this.state.appointment,
          clientId: this.props.clientId,
        })
        .then(() => {
          this.props.closeModal();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      this.props
        .createAppointment({
          ...this.state.appointment,
          clientId: this.props.clientId,
        })
        .then(() => {
          this.props.closeModal();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  onInputTextChange = (key, value) => {
    this.setState((prevState) => {
      return {
        appointment: {
          ...prevState.appointment,
          [key]: value || "",
          [`${key}Error`]: "",
        },
      };
    });
  };

  render() {
    const { closeModal, open } = this.props;
    const { appointment, savingAppointment } = this.state;

    return (
      <div className="appointment-modal">
        <Dialog
          open={open}
          onClose={closeModal}
          aria-labelledby="responsive-dialog-title"
          fullScreen={
            typeof window.orientation !== "undefined" ||
            navigator.userAgent.indexOf("IEMobile") !== -1
          }
          fullWidth
        >
          {!this.props.appointment ? (
            <DialogTitle style={dialogTitleStyle} id="responsive-dialog-title">
              Add a new appointment
            </DialogTitle>
          ) : (
            <DialogTitle style={dialogTitleStyle} id="responsive-dialog-title">
              Update appointment
            </DialogTitle>
          )}
          <div>
            <DialogContent style={{ paddingTop: 0 }}>
              {savingAppointment ? (
                <Loader />
              ) : (
                <FormControl fullWidth>
                  <FormLabel style={{ marginTop: "16px" }}>
                    Appointment Status*
                  </FormLabel>
                  <Select
                    value={appointment.apptStatus}
                    onChange={(e) =>
                      this.onInputTextChange("apptStatus", e.target.value)
                    }
                    inputProps={{
                      name: "apptStatus",
                      id: "appt-status",
                    }}
                  >
                    <MenuItem value="Complete">Complete</MenuItem>
                    <MenuItem value="Upcoming">Upcoming</MenuItem>
                  </Select>
                  <TextField
                    margin="normal"
                    id="service"
                    label="Service"
                    value={appointment.service}
                    onChange={(e) =>
                      this.onInputTextChange("service", e.target.value)
                    }
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date"
                      label="Appointment date*"
                      value={appointment.date}
                      onChange={(date) =>
                        this.onInputTextChange("date", convertToUnix(date))
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                    margin="normal"
                    id="time"
                    label="Appointment time (MST)"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    value={appointment.time}
                    onChange={(e) =>
                      this.onInputTextChange("time", e.target.value)
                    }
                  />
                  <FormLabel style={{ marginTop: "16px" }}>
                    Appointment Duration
                  </FormLabel>
                  <Select
                    value={appointment.duration}
                    onChange={(e) =>
                      this.onInputTextChange("duration", e.target.value)
                    }
                    inputProps={{
                      name: "apptDuration",
                      id: "appt-duration",
                    }}
                  >
                    <MenuItem value="30">30 minutes</MenuItem>
                    <MenuItem value="45">45 minutes</MenuItem>
                    <MenuItem value="60">1 hour</MenuItem>
                    <MenuItem value="75">1 hour 15 minutes</MenuItem>
                    <MenuItem value="90">1 hour 30 minutes</MenuItem>
                    <MenuItem value="105">1 hour 45 minutes</MenuItem>
                    <MenuItem value="120">2 hours</MenuItem>
                    <MenuItem value="135">2 hours 15 minutes</MenuItem>
                    <MenuItem value="150">2 hours30 minutes</MenuItem>
                    <MenuItem value="165">2 hours 45 minutes</MenuItem>
                    <MenuItem value="180">3 hours</MenuItem>
                    <MenuItem value="195">3 hours 15 minutes</MenuItem>
                    <MenuItem value="210">3 hours 30 minutes</MenuItem>
                    <MenuItem value="225">3 hours 45 minutes</MenuItem>
                    <MenuItem value="240">4 hours</MenuItem>
                    <MenuItem value="255">4 hours 15 minutes</MenuItem>
                    <MenuItem value="270">4 hours 30 minutes</MenuItem>
                    <MenuItem value="285">4 hours 45 minutes</MenuItem>
                    <MenuItem value="300">5 hours</MenuItem>
                  </Select>
                  <TextField
                    margin="normal"
                    id="location"
                    label="Location"
                    value={appointment.location}
                    onChange={(e) =>
                      this.onInputTextChange("location", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="amountCharged"
                    label="Amount charged"
                    type="number"
                    value={appointment.amountCharged}
                    onChange={(e) =>
                      this.onInputTextChange("amountCharged", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="tip"
                    label="Tip"
                    type="number"
                    value={appointment.tip}
                    onChange={(e) =>
                      this.onInputTextChange("tip", e.target.value)
                    }
                  />

                  <TextField
                    margin="normal"
                    id="productUsed"
                    label="Product(s) Used"
                    value={appointment.productUsed}
                    onChange={(e) =>
                      this.onInputTextChange("productUsed", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="retailItemsSold"
                    label="Retail items sold"
                    value={appointment.retailItemsSold}
                    onChange={(e) =>
                      this.onInputTextChange("retailItemsSold", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="retailItemsAmount"
                    label="Retail items amount"
                    type="number"
                    value={appointment.retailItemsAmount}
                    onChange={(e) =>
                      this.onInputTextChange(
                        "retailItemsAmount",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    margin="normal"
                    id="discountType"
                    label="Discount type"
                    value={appointment.discountType}
                    onChange={(e) =>
                      this.onInputTextChange("discountType", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="discountAmount"
                    label="Discount amount"
                    type="number"
                    value={appointment.discountAmount}
                    onChange={(e) =>
                      this.onInputTextChange("discountAmount", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="milesDriven"
                    label="Miles driven"
                    type="number"
                    value={appointment.milesDriven}
                    onChange={(e) =>
                      this.onInputTextChange("milesDriven", e.target.value)
                    }
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="followUpDate"
                      label="Follow up date"
                      value={appointment.followUpDate}
                      onChange={(date) =>
                        this.onInputTextChange(
                          "followUpDate",
                          convertToUnix(date)
                        )
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                    margin="normal"
                    id="followUpTime"
                    label="Follow up time (MST)"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    value={appointment.followUpTime}
                    onChange={(e) =>
                      this.onInputTextChange("followUpTime", e.target.value)
                    }
                  />
                  <TextField
                    id="notes"
                    label="Notes"
                    multiline
                    value={appointment.notes}
                    onChange={(e) =>
                      this.onInputTextChange("notes", e.target.value)
                    }
                    margin="normal"
                  />
                </FormControl>
              )}
            </DialogContent>
            <DialogActions style={dialogActionsStyle}>
              <Button
                onClick={this.handleAppointmentSubmit}
                color="primary"
                variant="contained"
                disabled={
                  !appointment.date ||
                  !appointment.apptStatus ||
                  savingAppointment
                }
              >
                Submit
              </Button>
              <Button onClick={closeModal} color="primary">
                Close
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appointments: state.appointments.appointmentsList,
  };
}

export default connect(mapStateToProps, {
  createAppointment,
  updateAppointment,
})(AppointmentModal);
