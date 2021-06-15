import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { convertToUnix } from "../../utils/dateUtil";
import Loader from "../ui-components/Loader";
import { createClient, updateClient } from "../../actions/clientsActions";
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

class ClientModal extends Component {
  state = {
    client: {
      firstName: "",
      lastName: "",
      waiver: false,
      phone: "",
      contactMethod: "",
      instagram: "",
      hairHistory: "",
      email: "",
      dob: null,
      allergies: "",
      venmo: "",
      notes: ""
    }
  };

  componentDidMount() {
    if (this.props.client) {
      this.setState({
        client: this.props.client
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.client !== this.props.client) {
      this.setState({
        client: {
          ...this.props.client
        }
      });
    }
  }

  handleClientSubmit = () => {
    this.setState({ savingClient: true });

    if (this.props.client) {
      this.props
        .updateClient(this.state.client)
        .then(() => {
          this.props.closeModal();
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.props
        .createClient(this.state.client)
        .then(() => {
          this.props.closeModal();
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  onInputTextChange = (key, value) => {
    this.setState(prevState => {
      return {
        client: {
          ...prevState.client,
          [key]: value,
          [`${key}Error`]: ""
        }
      };
    });
  };

  render() {
    const { closeModal, open, savingClient } = this.props;
    const { client } = this.state;

    return (
      <div className="client-modal">
        {savingClient && <Loader />}
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
          {!this.props.client ? (
            <DialogTitle style={dialogTitleStyle} id="responsive-dialog-title">
              Add a new client
            </DialogTitle>
          ) : (
            <DialogTitle style={dialogTitleStyle} id="responsive-dialog-title">
              Update {`${client.firstName} ${client.lastName}`}
            </DialogTitle>
          )}
          {!savingClient && (
            <div>
              <DialogContent style={{ paddingTop: 0 }}>
                <FormControl fullWidth>
                  <TextField
                    autoFocus
                    margin="normal"
                    id="firstName"
                    label="First name*"
                    value={client.firstName}
                    onChange={e =>
                      this.onInputTextChange("firstName", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="lastName"
                    label="Last name*"
                    value={client.lastName}
                    onChange={e =>
                      this.onInputTextChange("lastName", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="phone"
                    label="Phone"
                    value={client.phone}
                    onChange={e =>
                      this.onInputTextChange("phone", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="email"
                    label="Email"
                    type="email"
                    value={client.email}
                    onChange={e =>
                      this.onInputTextChange("email", e.target.value)
                    }
                  />

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      // disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="dob"
                      label="Birth date"
                      value={client.dob}
                      onChange={date =>
                        this.onInputTextChange("dob", convertToUnix(date))
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <FormLabel style={{ marginTop: "16px" }}>
                    Preferred contact method
                  </FormLabel>
                  <Select
                    value={client.contactMethod}
                    onChange={e =>
                      this.onInputTextChange("contactMethod", e.target.value)
                    }
                    inputProps={{
                      name: "contactMethod",
                      id: "contact-method"
                    }}
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="call">Call</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                  </Select>
                  <TextField
                    margin="normal"
                    id="instagram"
                    label="Instagram handle"
                    value={client.instagram}
                    onChange={e =>
                      this.onInputTextChange("instagram", e.target.value)
                    }
                  />

                  <TextField
                    margin="normal"
                    id="allergies"
                    label="Allergies"
                    value={client.allergies}
                    onChange={e =>
                      this.onInputTextChange("allergies", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="venmo"
                    label="Venmo"
                    value={client.venmo}
                    onChange={e =>
                      this.onInputTextChange("venmo", e.target.value)
                    }
                  />
                  <FormLabel style={{ marginTop: "16px" }}>
                    Waiver signed
                  </FormLabel>
                  <RadioGroup
                    aria-label="waiver"
                    name="waiver"
                    value={client.waiver}
                    onChange={e =>
                      this.onInputTextChange("waiver", e.target.value)
                    }
                    row
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio color="primary" />}
                      label="Yes"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio color="primary" />}
                      label="No"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                  <TextField
                    margin="normal"
                    id="hairHistory"
                    label="Hair history"
                    multiline
                    value={client.hairHistory}
                    onChange={e =>
                      this.onInputTextChange("hairHistory", e.target.value)
                    }
                  />
                  <TextField
                    id="notes"
                    label="Notes"
                    multiline
                    value={client.notes}
                    onChange={e =>
                      this.onInputTextChange("notes", e.target.value)
                    }
                    margin="normal"
                  />
                </FormControl>
              </DialogContent>
              <DialogActions style={dialogActionsStyle}>
                <Button
                  onClick={this.handleClientSubmit}
                  color="primary"
                  variant="contained"
                  disabled={!client.firstName || !client.lastName}
                >
                  Submit
                </Button>
                <Button onClick={closeModal} color="primary">
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
    clients: state.clients.clientsList
  };
}

export default connect(mapStateToProps, { createClient, updateClient })(
  ClientModal
);
