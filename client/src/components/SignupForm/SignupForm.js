import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import SignupValidator from './SignupValidator'

import styles from '../LoginForm/LoginForm.scss'
import { signup } from '../../actions'

function EmailField ({ input, meta: { error } }) {
  return [
    <input key="field"
      className={styles.inputEmail}
      placeholder="Email"
      {...input} />,

    <div key="error">
      {error}
    </div>
  ]
}

function PasswordField ({ input, meta: { error, active } }) {
  return [
    <input key="field"
      className={styles.inputPassword}
      type="password"
      placeholder="Password"
      {...input} />,
    <Field key="popup" name="popup"
      component={ValidationPopup} active={active} error={error} />
  ]
}

const ValidationPopup = ({error, active}) => {
  return (
    <div className={`${styles.validpopup} ${active ? styles.show : styles.hide}` }>
      <p className={styles.bold}>Password must have</p>
      <ul>
        <li className={ error == null || error.upperCase ? styles.tick : styles.cross }> at least 1 UpperCase Character </li>
        <li className={ error == null || error.lowerCase ? styles.tick : styles.cross }> at least 1 LowerCase Character </li>
        <li className={ error == null || error.hasOneDigit ? styles.tick : styles.cross }> at least 1 Number </li>
        <li className={ error == null || error.hasSpecialChar ? styles.tick : styles.cross }> at least 1 Special Character </li>
        <li className={ error == null || error.minLength ? styles.tick : styles.cross }> at least 10 Characters </li>
        <li className={ error == null || error.maxLength ? styles.tick : styles.cross }> at most 128 Characters </li>
        <li className={ error == null || error.noIdenticalChars ? styles.tick : styles.cross }> not more than 2 identical characters in a row </li>
      </ul>
    </div>
  )
}

function SignupForm (props) {
  const { handleSubmit, signup } = props

  return (
    <form className={styles.form} onSubmit={handleSubmit(signup)}>
      <h1 className={styles.title}>Signup</h1>

      <Field name="email"
        component={EmailField}
        validate={SignupValidator.validateEmail} />
      <Field name="password"
        component={PasswordField}
        validate={SignupValidator.validatePassword} />

      <button className={styles.buttonSubmit} type="submit">
        Submit
      </button>
    </form>
  )
}

EmailField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

PasswordField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

SignupForm.propTypes = {
  signup: PropTypes.func,
  handleSubmit: PropTypes.func
}

ValidationPopup.propTypes = {
  error: PropTypes.object,
  active: PropTypes.bool
}

const SignupFormRedux = reduxForm({
  form: 'SignupForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/'))
})(SignupForm)

export default connect(null, { signup })(SignupFormRedux)
