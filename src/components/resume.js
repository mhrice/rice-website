import React, { Component } from "react";
import "../styles/resume.css";


class Resume extends Component {
  render() {
    return (
      <div className="resume-container">
        <object data="/Rice_Resume.pdf" type="application/pdf" className="resume">
          <p>Alternative text - include a link <a href="/Rice_Resume.pdf">to the PDF!</a></p>
        </object>
      </div>
    )
  }
}
export default Resume;