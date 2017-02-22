import React, { Component } from 'react';
import './navbar.css'
import logo_128 from '../assets/logo_128.png';


class Navbar extends Component {

  render() {

    this.parentMethods = this.props.parentMethods;

    return (
      <nav>
        <div className="brand">
          <img className="nav-logo" src={logo_128} alt="DS Changelog Logo" />
          <h1>DS Changelog</h1>
        </div>
        <div className="actions">
          <label onClick={this.parentMethods.saveFile} className="nav-item" htmlFor="btn-save" title="Save">
            <svg fill="#fff" height="18" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
            </svg>
          </label>
          <button id="btn-save" hidden></button>

          <label onClick={this.parentMethods.openFile} className="nav-item" htmlFor="btn-open-file" title="Open file">
            <svg fill="#fff" height="18" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
            </svg>
          </label>
          <button id="btn-open-file" hidden></button>

          <label className="nav-item" htmlFor="btn-new-entry" title="New entry">
            <svg fill="#fff" height="18" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z" />
            </svg>
          </label>
          <button id="btn-new-entry" hidden></button>
        </div>

      </nav>
    );
  }
}

export default Navbar;