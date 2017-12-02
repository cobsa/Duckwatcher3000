/* 
Handles navigation and changing language.
*/

import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setActiveLanguage, getTranslate } from 'react-localize-redux'

const mapStateToProps = state => {
  return {
    pathname: state.router.location.pathname,
    translate: getTranslate(state.locale)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeLanguage: language => {
      dispatch(setActiveLanguage(language))
    }
  }
}

/* Navigation bar component */
export class NavbarComponent extends React.Component {
  render() {
    const { translate } = this.props
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          {translate('navigation.title')}
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
                {translate('navigation.sightings')}
              </Link>
            </li>
            <li className={this.props.pathname === '/addSighting' ? 'active nav-item' : 'nav-item'}>
              <Link className="nav-link" to="/addSighting">
                {translate('navigation.addSighting')}
              </Link>
            </li>
          </ul>
          <button className="language-btn" onClick={this.props.changeLanguage.bind(this, 'en')}>
            <img className="flag-image" src="../static/flags/en.png" />
          </button>
          <button className="language-btn" onClick={this.props.changeLanguage.bind(this, 'fi')}>
            <img className="flag-image" src="../static/flags/fi.png" />
          </button>
        </div>
      </nav>
    )
  }
}

const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarComponent)

export default Navbar
