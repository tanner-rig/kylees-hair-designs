import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Routes from "./routes/routes";
import v from "../../styles/variables";

import './app.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: v.colorPrimaryLight,
      main: v.colorPrimary,
      dark: v.colorPrimaryDark,
      contrastText: v.colorWhite
    }
  }
});

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <Routes />
        </div>
      </MuiThemeProvider>
    );
  }
}
