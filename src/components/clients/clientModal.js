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
  useMediaQuery
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

// import Loader from "../ui-components/Loader";
import { createClient } from "../../actions/clientsActions";
import "./clientModal.scss";

class ClientModal extends Component {
  handleClientSubmit = client => {
    this.setState({ savingClient: true });
    createClient(client)
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
  };

  render() {
    const { client, closeModal, open } = this.props;
    const { savingClient } = this.props;

    return (
      <div className="client-modal">
        {!client ? (
          <Dialog
            open={open}
            onClose={closeModal}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              Add a new client
            </DialogTitle>
            {savingClient && (
              <div>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                  />
                  <RadioGroup
                    aria-label="waiver"
                    name="waiver"
                    // value={value}
                    // onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="top"
                      control={<Radio color="primary" />}
                      label="Top"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Radio color="primary" />}
                      label="Start"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={this.handleClientSubmit}
                    color="primary"
                    autoFocus
                  >
                    Submit
                  </Button>
                  <Button onClick={this.handleOpenClientModal} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </div>
            )}
          </Dialog>
        ) : (
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={closeModal}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              Update {`${client.firstName} ${client.lastName}`}
            </DialogTitle>
            {savingClient && (
              <div>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={this.handleClientSubmit}
                    color="primary"
                    autoFocus
                  >
                    Submit
                  </Button>
                  <Button onClick={this.handleOpenClientModal} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </div>
            )}
          </Dialog>
        )}
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
