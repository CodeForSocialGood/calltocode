import React, { Component } from 'react'
import { reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import AuthActionCreator from '../../actions/auth'
import SendVerificationCodeForm from './SendVerificationCodeForm'
import ValidateVerificationCode from './ValidateVerificationCodeForm'
import NewPasswordForm from './NewPasswordForm'
import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import forgotPasswordApiClient from '../../api/forgotPassword'
import styles from './ForgotPasswordForm.scss'

class ForgotPasswordForm extends Component {
  constructor (props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.validate = this.validate.bind(this)
    this.changePass = this.changePass.bind(this)
    this.state = {
      page: 1
    }
  }

  nextPage ({email}) {
    return this.props.sendValidationCode(email).then(() => {
      this.setState({page: this.state.page + 1})
    }).catch((error) => { throw new SubmissionError({ code: error.name, _error: error.message }) })
  }

  async validate (values, dispatch) {
    const _error = 'Incorrect code, please try again!'
    const apiOptions = apiOptionsFromState()
    const response = await forgotPasswordApiClient.validateCode(apiOptions, this.props.email, values.code)
    if (response.status === 200) {
      this.setState({page: this.state.page + 1})
    } else {
      throw new SubmissionError({ code: response.statusText, _error })
    }
  }

  changePass (values, dispatch) {
    return this.props.changePassword(this.props.email, values.password).then(() => {
      dispatch(push('/'))
    }).catch(error => {
      throw new SubmissionError({code: error.name, _error: error.message})
    })
  }

  render () {
    const {page} = this.state
    const {error} = this.props
    console.log('error', error)
    return (
      <div>
        {page === 1 && <SendVerificationCodeForm onSubmit={this.nextPage} />}
        {page === 2 &&
        <div>
          <ValidateVerificationCode onSubmit={this.validate}/>
        </div>}
        {page === 3 &&
        <div>
          <NewPasswordForm email={this.props.email} onSubmit={this.changePass}/>
        </div>}
        <div className={styles.errorContent}>
          {error}
        </div>
      </div>

    )
  }
}

ForgotPasswordForm.propTypes = {
  sendValidationCode: PropTypes.func,
  validateCode: PropTypes.func,
  email: PropTypes.string,
  handleSubmit: PropTypes.func,
  error: PropTypes.any,
  changePassword: PropTypes.func
}

const mapDispatchToProps = {
  sendValidationCode: AuthActionCreator.sendValidationCode,
  changePassword: AuthActionCreator.changePassword
}

function mapStateToProps (state) {
  return {
    email: state.forgotPass.email
  }
}

const ForgotPasswordFormRedux = reduxForm({
  form: 'ForgotPasswordForm',
  onSubmitSuccess: (result, dispatch) => {
    dispatch(push('/'))
  }
})(ForgotPasswordForm)

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordFormRedux)
