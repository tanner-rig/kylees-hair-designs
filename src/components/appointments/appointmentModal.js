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
  FormControl
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { convertToUnix } from "../../utils/dateUtil";
import Loader from "../ui-components/Loader";
import {
  createAppointment,
  updateAppointment
} from "../../actions/appointmentsActions";
import v from "../../styles/variables";

const dialogTitleStyle = {
  borderBottom: `1px solid ${v.colorBlack15}`
};

class AppointmentModal extends Component {
  defaultAppt = {
    amountPaid: "",
    apptStatus: "",
    clientId: this.props.clientId,
    date: Date.now(),
    discountAmount: "",
    discountType: "",
    duration: "",
    followUpDate: Date.now(),
    followUpTime: "",
    location: "",
    milesDriven: "",
    notes: "",
    productUsed: "",
    retailItemsAmount: "",
    retailItemsSold: "",
    service: "",
    time: "",
    tip: "",
    savingAppointment: false
  }

  state = {
    appointment: this.defaultAppt
  };

  componentDidMount() {
    if (this.props.appointment) {
      this.setState({
        appointment: {
          ...this.props.appointment,
          clientId: this.props.clientId
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.clientId !== this.props.clientId) {
      this.setState({
        appointment: {
          ...this.state.appointment,
          clientId: this.props.clientId
        }
      });

      this.defaultAppt.clientId = this.props.clientId;
    }
  }

  handleAppointmentSubmit = () => {
    this.setState({ savingAppointment: true });

    this.props.closeModal();

    if (this.props.appointment) {
      this.props
        .updateAppointment(this.state.appointment)
        .then(() => {
          this.setState({
            savingAppointment: false,
            appointment: this.defaultAppt
          });
        })
        .catch(err => {
          this.setState({
            savingAppointment: false,
            newAppointmentError: err,
            appointment: this.defaultAppt
          });
        });
    } else if (this.state.appointment.apptStatus) {
      this.props
        .createAppointment(this.state.appointment)
        .then(() => {
          this.setState({
            savingAppointment: false,
            appointment: this.defaultAppt
          });
        })
        .catch(err => {
          this.setState({
            savingAppointment: false,
            newAppointmentError: err,
            appointment: this.defaultAppt
          });
        });
    } else {
      console.error("need a status");
    }
  };

  onInputTextChange = (key, value) => {
    this.setState(prevState => {
      return {
        appointment: {
          ...prevState.appointment,
          [key]: value,
          [`${key}Error`]: ""
        }
      };
    });
  };

  render() {
    const { appointment, closeModal, open } = this.props;
    const { savingAppointment } = this.props;

    return (
      <div className="appointment-modal">
        {savingAppointment && <Loader />}
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
          {!appointment ? (
            <DialogTitle style={dialogTitleStyle} id="responsive-dialog-title">
              Add a new appointment
            </DialogTitle>
          ) : (
            <DialogTitle style={dialogTitleStyle} id="responsive-dialog-title">
              Update appointment
            </DialogTitle>
          )}
          {!savingAppointment && (
            <div>
              <DialogContent style={{ paddingTop: 0 }}>
                <FormControl fullWidth>
                  <FormLabel style={{ marginTop: "16px" }}>
                    Appointment Status
                  </FormLabel>
                  <Select
                    value={this.state.appointment.apptStatus}
                    onChange={e =>
                      this.onInputTextChange("apptStatus", e.target.value)
                    }
                    inputProps={{
                      name: "apptStatus",
                      id: "appt-status"
                    }}
                  >
                    <MenuItem value="complete">Complete</MenuItem>
                    <MenuItem value="upcoming">Upcoming</MenuItem>
                  </Select>
                  <TextField
                    autoFocus
                    margin="normal"
                    id="service"
                    label="Service"
                    value={this.state.appointment.service}
                    onChange={e =>
                      this.onInputTextChange("service", e.target.value)
                    }
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date"
                      label="Appt. date"
                      value={this.state.appointment.date}
                      onChange={date =>
                        this.onInputTextChange("date", convertToUnix(date))
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                    autoFocus
                    margin="normal"
                    id="time"
                    label="Appt. time"
                    type="time"
                    defaultValue="09:00"
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
                    value={this.state.appointment.time}
                    onChange={e =>
                      this.onInputTextChange("time", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="duration"
                    label="Appt. duration (minutes)"
                    type="number"
                    value={this.state.appointment.duration}
                    onChange={e =>
                      this.onInputTextChange("duration", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="location"
                    label="Location"
                    value={this.state.appointment.location}
                    onChange={e =>
                      this.onInputTextChange("location", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="amountPaid"
                    label="Amount paid"
                    type="number"
                    value={this.state.appointment.amountPaid}
                    onChange={e =>
                      this.onInputTextChange("amountPaid", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="tip"
                    label="Tip"
                    type="number"
                    value={this.state.appointment.tip}
                    onChange={e =>
                      this.onInputTextChange("tip", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="discountType"
                    label="Discount type"
                    value={this.state.appointment.discountType}
                    onChange={e =>
                      this.onInputTextChange("discountType", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="discountAmount"
                    label="Discount amount"
                    type="number"
                    value={this.state.appointment.discountAmount}
                    onChange={e =>
                      this.onInputTextChange("discountAmount", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="productUsed"
                    label="Product Used"
                    value={this.state.appointment.productUsed}
                    onChange={e =>
                      this.onInputTextChange("productUsed", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="retailItemsSold"
                    label="Retail items sold"
                    value={this.state.appointment.retailItemsSold}
                    onChange={e =>
                      this.onInputTextChange("retailItemsSold", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="retailItemsAmount"
                    label="Retail items amount"
                    type="number"
                    value={this.state.appointment.retailItemsAmount}
                    onChange={e =>
                      this.onInputTextChange(
                        "retailItemsAmount",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    margin="normal"
                    id="milesDriven"
                    label="Miles driven"
                    type="number"
                    value={this.state.appointment.milesDriven}
                    onChange={e =>
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
                      value={this.state.appointment.followUpDate}
                      onChange={date =>
                        this.onInputTextChange(
                          "followUpDate",
                          convertToUnix(date)
                        )
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                    margin="normal"
                    id="followUpTime"
                    label="Follow up time"
                    type="time"
                    defaultValue="09:00"
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
                    value={this.state.appointment.followUpTime}
                    onChange={e =>
                      this.onInputTextChange("followUpTime", e.target.value)
                    }
                  />
                  <TextField
                    id="notes"
                    label="Notes"
                    multiline
                    value={this.state.appointment.notes}
                    onChange={e =>
                      this.onInputTextChange("notes", e.target.value)
                    }
                    margin="normal"
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleAppointmentSubmit}
                  color="primary"
                  autoFocus
                >
                  Submit
                </Button>
                <Button onClick={() => {
                  this.setState({ appointment: this.defaultAppt });
                  closeModal();
                }} color="primary">
                  Close
                </Button>
              </DialogActions>
            </div>
          )}
        </Dialog>
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
  { createAppointment, updateAppointment }
)(AppointmentModal);
