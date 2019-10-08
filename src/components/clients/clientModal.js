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

import { convertToUnix } from '../../utils/dateUtil';
import Loader from "../ui-components/Loader";
import { createClient } from "../../actions/clientsActions";
import v from "../../styles/variables";

const dialogTitleStyle = {
  borderBottom: `1px solid ${v.colorBlack15}`
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
      dob: Date.now(),
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

  handleClientSubmit = () => {
    this.setState({ savingClient: true });

    if (this.state.client.firstName) {
      this.props.createClient(this.state.client)
        .then(() => {
          this.setState({ clientModalOpen: false, savingClient: false });
        })
        .catch(err => {
          this.setState({
            clientModalOpen: false,
            savingClient: false,
            newClientError: err
          });
        });
    } else {
      console.error('need a first name');
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
    const { client, closeModal, open } = this.props;
    const { savingClient } = this.props;

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
          {!client ? (
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
                    label="First name"
                    type="firstName"
                    value={this.state.client.firstName}
                    onChange={e =>
                      this.onInputTextChange("firstName", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="lastName"
                    label="Last name"
                    type="lastName"
                    value={this.state.client.lastName}
                    onChange={e =>
                      this.onInputTextChange("lastName", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="phone"
                    label="Phone"
                    type="phone"
                    value={this.state.client.phone}
                    onChange={e =>
                      this.onInputTextChange("phone", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="email"
                    label="Email"
                    type="email"
                    value={this.state.client.email}
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
                      value={this.state.client.dob}
                      onChange={date => this.onInputTextChange("dob", convertToUnix(date))}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <FormLabel style={{ marginTop: "16px" }}>
                    Preferred contact method
                  </FormLabel>
                  <Select
                    value={this.state.client.contactMethod}
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
                    type="instagram"
                    value={this.state.client.instagram}
                    onChange={e =>
                      this.onInputTextChange("instagram", e.target.value)
                    }
                  />

                  <TextField
                    margin="normal"
                    id="allergies"
                    label="Allergies"
                    type="allergies"
                    value={this.state.client.allergies}
                    onChange={e =>
                      this.onInputTextChange("allergies", e.target.value)
                    }
                  />
                  <TextField
                    margin="normal"
                    id="venmo"
                    label="Venmo"
                    type="venmo"
                    value={this.state.client.venmo}
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
                    value={this.state.client.waiver}
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
                    type="hairHistory"
                    multiline
                    value={this.state.client.hairHistory}
                    onChange={e =>
                      this.onInputTextChange("hairHistory", e.target.value)
                    }
                  />
                  <TextField
                    id="notes"
                    label="Notes"
                    multiline
                    value={this.state.client.notes}
                    onChange={e =>
                      this.onInputTextChange("notes", e.target.value)
                    }
                    margin="normal"
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleClientSubmit}
                  color="primary"
                  autoFocus
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

export default connect(
  mapStateToProps,
  { createClient }
)(ClientModal);
