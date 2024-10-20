import React, { Component } from "react";
import "../styles/resume.css";


class Resume extends Component {
  render() {
    return (
      <div className="resume-container">
        <object data="/Rice_Resume.pdf" type="application/pdf" className="resume">
          <a href="/Rice_Resume.pdf">Download my resume</a>
        </object>
      </div>
    )
  }
}
export default Resume;