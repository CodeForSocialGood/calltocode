import React from 'react'
import {Field, reduxForm} from 'redux-form'
import styles from './ForgotPasswordForm.scss'
import PropTypes from 'prop-types'

function CodeField ({ input }) {
  return (
    <input
      className={styles.inputEmail}
      placeholder="Code"
      {...input} />
  )
}

const ValidateVerificationCodeForm = props => {
  const {handleSubmit} = props
  return (

    <form onSubmit={handleSubmit}
      className={styles.form}>

      <h1
        className={styles.title}>
      Forgot Password?
      </h1>

      <h3>{"Let's validate your code!"}</h3>

      <Field
        name="code"
        component={CodeField} />

      <button
        className={styles.buttonSubmit}
        type="submit">
      Validate code
      </button>
    </form>
  )
}

CodeField.propTypes = {
  input: PropTypes.object
}
ValidateVerificationCodeForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default reduxForm({
  form: 'ForgotPasswordForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(ValidateVerificationCodeForm)
