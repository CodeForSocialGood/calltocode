import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import styles from './LandingD.scss'

class LandingD extends Component {
  render () {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>
          Changing the world, one project at a time
        </h1>

        <div className={styles.subcontainer}>

          <div className={styles.column1}>
            <img src="https://images.unsplash.com/photo-1517476417305-21d49f984355?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3f86c41b2363dff6436d3f94f0d12994&auto=format&fit=crop&w=500&q=60"
             alt="project 1" className={styles.project1}/>
            <h6 className={styles.projectTitle}>The number of Protons</h6>
            <p className={styles.projectDetails}>
              Apple Inc has decided to launch the much awaited Apple Watch in
            </p>
            <Button to="#" component={Link} className={styles.learnMore}>
              Learn More
            </Button>
          </div>

          <div className={styles.column2}>
            <img src="https://images.unsplash.com/photo-1504113897779-231f76737a4e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f264bf40175453d2130f7d354122bfb6&auto=format&fit=crop&w=500&q=60"
             alt="project 2" className={styles.project1}/>
            <h6 className={styles.projectTitle}>Sports Stadium Birdview</h6>
            <p className={styles.projectDetails}>
            Apple Inc has decided to launch the much awaited Apple Watch in
            </p>
            <Button to="#" component={Link} className={styles.learnMore}>
              Learn More
            </Button>
          </div>

          <div className={styles.column3}>
            <img src="https://images.unsplash.com/photo-1501675423372-9bfa95849e62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7b897a182136b934563ed43d435b6981&auto=format&fit=crop&w=1500&q=80"
             alt="project 3" className={styles.project1}/>
            <h6 className={styles.projectTitle}>The number of Protons</h6>
            <p className={styles.projectDetails}>
            Apple Inc has decided to launch the much awaited Apple Watch in
            </p>
            <Button to="#" component={Link} className={styles.learnMore}>
              Learn More
            </Button>
          </div>

        </div>

        <div className={styles.viewAllContainer}>
          <Button to="/" component={Link} className={styles.viewAll}>
            VIEW ALL
          </Button>
        </div>
      </div>
    )
  }
}

export default LandingD
