import React from 'react'
import { Link } from 'react-router-dom'
/* Navigation bar component */

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          DuckWatcher 3000
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Sightings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addSighting">
                Add Sighting
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
