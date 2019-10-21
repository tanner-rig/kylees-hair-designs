import React, { Component } from "react";

import "./home.scss";

import InstagramIcon from "../../../assets/IG_Glyph_fill.png";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Our website is coming soon!</h1> <br />
        Please visit 
        <a href="https://www.instagram.com/kylee.hair.designs">
          <img src={InstagramIcon} alt="instagram icon" />
          @kylee.hair.designs
        </a>
      </div>
    );
  }
}
