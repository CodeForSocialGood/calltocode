import styles from './Header.css'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

class Header extends React.Component {
  render () {
    let headerButtons
    if (this.props.loggedIn) {
      headerButtons = <Link to='/' className={styles.button}>LOG OUT</Link>
    } else {
      headerButtons = [
        <Link key='signup' to='/' className={styles.button}>SIGN UP</Link>,
        <Link key='login' to='/login' className={styles.button}>LOGIN</Link>
      ]
    }
    return (
      <header className={styles.header}>
        {headerButtons}
      </header>
    )
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool
}

function mapStateToProps (state) {
  return { loggedIn: state.login.loggedIn }
}

export default connect(mapStateToProps)(Header)
