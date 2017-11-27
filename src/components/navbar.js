import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
/* Navigation bar component */

const mapStateToProps = state => {
  return {
    pathname: state.router.location.pathname
  }
}

export class NavbarComponent extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          DuckWatcher 3000
        </Link>
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
            <li className={this.props.pathname === '/' ? 'active nav-item' : 'nav-item'}>
              <Link className="nav-link" to="/">
                Sightings
              </Link>
            </li>
            <li className={this.props.pathname === '/addSighting' ? 'active nav-item' : 'nav-item'}>
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

const Navbar = connect(mapStateToProps)(NavbarComponent)

export default Navbar
