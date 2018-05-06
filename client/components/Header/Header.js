import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge'
import Button from 'material-ui/Button'
import defaultProfileImage from '../../../images/profile-image.jpg'
import AuthActionCreator from '../../actions/auth'
import styles from './Header.scss'
import ApplicationActionCreator from '../../actions/application'
import logo from '../../images/logo-nav.png'

class Header extends Component {
  constructor (props) {
    super(props)

    this.renderHeaderButtons = this.renderHeaderButtons.bind(this)
    this.getLinkStyles = this.getLinkStyles.bind(this)
    this.renderNotificationBadge = this.renderNotificationBadge.bind(this)
  }

  componentDidMount () {
    if (this.props.authenticated) {
      this.props.getNotifications()
    }
  }

  renderNotificationBadge () {
    const { applications } = this.props
    return (
      applications && (
        <Link
          key="show-applications"
          to="/show-applications"
          className={this.getLinkStyles('show-project')}>
          {applications.notSeenCounter > 0 ? (
            <Badge badgeContent={applications.notSeenCounter} color="primary">
              <span className={styles.applicationBadgeText}>APPLICATIONS</span>
            </Badge>
          ) : (
            <span className={styles.applicationBadgeText}>APPLICATIONS</span>
          )}
        </Link>
      )
    )
  }

  renderHeaderButtons () {
    if (this.props.authenticated) {
      const authButtons = [
        <Link
          key="logout"
          to="/"
          onClick={this.props.logout}
          className={this.getLinkStyles()}>
          LOG OUT
        </Link>,
        <Link
          key="profile"
          to="/profile"
          className={this.getLinkStyles('profile')}>
          <Avatar
            src={
              this.props.user.profilePicture || defaultProfileImage
            }
          />
        </Link>
      ]
      if (this.props.user.usertype === 'contact') {
        return [
          this.renderNotificationBadge(),
          <Link
            key="create-project"
            to="/create-project"
            className={this.getLinkStyles('create-project')}>
            CREATE PROJECT
          </Link>,
          ...authButtons
        ]
      } else {
        return authButtons
      }
    } else {
      return [
        <Link
          key="projects"
          to="/projects"
          className={this.getLinkStyles('projects')}>
          PROJECTS
        </Link>,
        <Link key="login" to="/login" className={this.getLinkStyles('login')}>
          LOG IN
        </Link>,
        <Button
          key="signup"
          to="/signup"
          component={Link}
          className={styles.navButton}>
          SIGN UP
        </Button>
      ]
    }
  }

  getLinkStyles (page) {
    return this.props.currentPage.includes(page)
      ? `${styles.button} ${styles.active}`
      : `${styles.button}`
  }

  render () {
    return (
      <div className={styles.headerRoot}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar style={{ height: '128px' }}>
            <Typography type="title" color="inherit" className={styles.flex}>
              <Link to="/">
                <img
                  src={logo}
                  alt="Calltocode logo"
                  className={styles.navLogo}
                />
              </Link>
            </Typography>
            {this.renderHeaderButtons()}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    applications: state.application,
    authenticated: state.auth.authenticated,
    currentPage: state.routing.location.pathname,
    user: state.user,
    login: state.login
  }
}

const mapDispatchToProps = {
  logout: AuthActionCreator.logout,
  getNotifications: ApplicationActionCreator.getNotifications
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  login: PropTypes.object,
  applications: PropTypes.shape({
    applications: PropTypes.any,
    fetching: PropTypes.bool,
    notSeenCounter: PropTypes.number
  }),
  getNotifications: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
