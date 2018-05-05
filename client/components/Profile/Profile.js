import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ProjectActionCreator from '../../actions/project'
import UserActionCreator from '../../actions/user'
import ProfilePictureForm from './ProfilePictureForm/ProfilePictureForm'
import ListOfProjects from '../ListOfProjects/ListOfProjects'
import styles from './Profile.scss'

class Profile extends Component {
  componentDidMount () {
    this.props.onLoad(this.props.user)
  }

  render () {
    const title =
      this.props.user.usertype === 'contact'
        ? "Your Organization's Projects"
        : 'Projects Applied For'

    return (
      <div className={styles.profilePage}>
        <div className={styles.profilePictureForm}>
          <ProfilePictureForm
            user={this.props.user}
            updateProfilePicture={this.props.updateProfilePicture} />
        </div>

        <div className={styles.listOfProjects}>
          <h3 className={styles.youProjects}>Your Projects</h3>
          <ListOfProjects title={title} projects={this.props.projects} />
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    projects: state.project.projects,
    user: state.user
  }
}

const mapDispatchToProps = {
  onLoad: ProjectActionCreator.fetchProfileProjects,
  updateProfilePicture: UserActionCreator.updateProfilePicture
}

Profile.propTypes = {
  onLoad: PropTypes.func,
  updateProfilePicture: PropTypes.func,
  projects: PropTypes.array,
  user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
