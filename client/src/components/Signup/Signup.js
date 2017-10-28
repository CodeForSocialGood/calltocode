import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import styles from '../Login/Login.css'
import { signup } from '../../actions'

/**
 * Method to validate password according to this site: https://www.owasp.org/index.php/Authentication_Cheat_Sheet#Password_Complexity
 * * Password must meet at least 3 out of the following 4 complexity rules
 *  * at least 1 uppercase character (A-Z)
 *  * at least 1 lowercase character (a-z)
 *  * at least 1 digit (0-9)
 *  * at least 1 special character (punctuation) — do not forget to treat space as special characters too
 * * at least 10 characters
 * * at most 128 characters
 * * not more than 2 identical characters in a row (e.g., 111 not allowed)
 * @param {*} value password to be validated
 */
const validatePassword = value => {
  const regexSpecialChars = new RegExp(/[\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~"]/)
  const regexLowerCase = new RegExp(/[a-z]/)
  const regexUpperCase = new RegExp(/[A-Z]/)
  const regexDigit = new RegExp(/[0-9]/)
  const regexIdenticalChars = new RegExp(/([0-9]|[aA-zZ])\1\1/)

  const res = {
    minLength: value && value.length >= 10,
    maxLength: value && value.length <= 128,
    noIdenticalChars: value && !regexIdenticalChars.test(value),
    upperCase: value && regexUpperCase.test(value),
    lowerCase: value && regexLowerCase.test(value),
    hasOneDigit: value && regexDigit.test(value),
    hasSpecialChar: value && regexSpecialChars.test(value),
    isValid: false
  }
  let counter = 0

  if (res.upperCase) {
    counter++
  }
  if (res.lowerCase) {
    counter++
  } if (res.hasOneDigit) {
    counter++
  }
  if (res.hasSpecialChar) {
    counter++
  }

  if (counter >= 3 && res.noIdenticalChars && res.minLength && res.maxLength) {
    res.isValid = true
  }
  return res
}

/**
 * Method to validate email - adapted from http://rosskendall.com/blog/web/javascript-function-to-check-an-email-address-conforms-to-rfc822
 * @param {*} value email to be validated
 */
const validateEmail = value => {
  const res = {
    message: '',
    isValid: false
  }
  if (!value || (value && value.length === 0)) {
    res.message = 'Can\'t be blank'
    res.isValid = false
    return res
  }

  const sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]'
  const sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]'
  const sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+'
  const sQuotedPair = '\\x5c[\\x00-\\x7f]'
  const sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d'
  const sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22'
  const sDomainRef = sAtom
  const sSubDomain = '(' + sDomainRef + '|' + sDomainLiteral + ')'
  const sWord = '(' + sAtom + '|' + sQuotedString + ')'
  const sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*'
  const sLocalPart = sWord + '(\\x2e' + sWord + ')*'
  const sAddrSpec = sLocalPart + '\\x40' + sDomain // complete RFC822 email address spec
  const sValidEmail = '^' + sAddrSpec + '$' // as whole string

  const reValidEmail = new RegExp(sValidEmail)
  if (reValidEmail.test(value)) {
    res.isValid = true
  } else {
    res.isValid = false
    res.message = 'Invalid email'
  }

  return res
}
const renderEmail = ({ input, meta: { error, warning } }) => {
  return (
    <div>
      <input className={styles.inputEmail}
        placeholder="Email"
        {...input} />
      {(error && !error.isValid && <div>{error.message}</div>)}
    </div>

  )
}

const renderPassword = ({ input, meta: { error, warning } }) => {
  return (
    <div>
      <input className={styles.inputPassword}
        type="password"
        placeholder="Password"
        {...input} />
      {(error && !error.isValid && <div>{JSON.stringify(error)}</div>)}
    </div>
  )
}

const Signup = (props) => {
  const { handleSubmit } = props
  return (
    <form className={styles.form} onSubmit={handleSubmit(signup)}>
      <h1 className={styles.title}>Signup</h1>

      <Field name="email"
        component={renderEmail} validate={validateEmail} />
      <Field name="password" validate={validatePassword}
        component={renderPassword} />

      <button className={styles.buttonSubmit} type="submit">
        Submit
      </button>
    </form>
  )
}

renderEmail.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

renderPassword.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

Signup.propTypes = {
  handleSubmit: PropTypes.func
}

export default reduxForm({
  form: 'SignupForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/'))
})(Signup)
