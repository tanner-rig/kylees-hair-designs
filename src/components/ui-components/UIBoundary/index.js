import React, { PureComponent } from "react";

import "./UIBoundary.scss";

export default class ButtonSelectOne extends PureComponent {
  render() {
    return <div className="UIBoundary">{this.props.children}</div>;
  }
}
