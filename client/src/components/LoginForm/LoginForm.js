import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import styles from './LoginForm.scss'
import { login } from '../../actions'
import loginApiClient from '../../api/login'

class LoginForm extends Component {
  renderEmail (field) {
    return (
      <input className={styles.inputEmail}
        placeholder="Email"
        {...field.input} title = {field.meta.error} />
    )
  }

  renderPassword (field) {
    return (
      <input className={styles.inputPassword}
        placeholder="Password"
        type="password"
        {...field.input} title = {field.meta.error} />
    )
  }

  async validateEmailAndPassword (values) {
    const { email, password } = values
    const response = await loginApiClient.login(email, password)

    if (response.status === 403) {
      if (response.statusText === 'Wrong Email') {
        throw new SubmissionError({ email: response.statusText,
          _error: 'Incorrect credentials, please try again!!' })
      } else if (response.statusText === 'Wrong Password') {
        throw new SubmissionError({ password: response.statusText,
          _error: 'Incorrect credentials, please try again!' })
      } else {
        throw new SubmissionError({ email,
          _error: 'Incorrect credentials, please try again!' })
      }
    } else {
      this.props.login({ email })
    }
  }

  render () {
    const { handleSubmit, error } = this.props

    return (
      <form className={styles.form} onSubmit={handleSubmit(this.validateEmailAndPassword.bind(this))}>
        <h1 className={styles.title}>Login</h1>

        <Field name="email"
          component={this.renderEmail} />
        <Field name="password"
          component={this.renderPassword} />

        <button className={error ? styles.buttonError : styles.buttonSubmit} type="submit">
          Submit
        </button>
        <div className={styles.errorContent}>
          {error}
        </div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  login: PropTypes.func,
  handleSubmit: PropTypes.func,
  error: PropTypes.string
}

const LoginFormRedux = reduxForm({
  form: 'LoginForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/'))
})(LoginForm)

export default connect(null, { login })(LoginFormRedux)
