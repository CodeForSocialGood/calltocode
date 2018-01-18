const sendgrid = require('@sendgrid/mail')

const bindFunctions = require('../../bindFunctions')
const ForgotPasswordModel = require('../../database/models/ForgotPassword')
const UserModel = require('../../database/models/User')

const forgotPasswordController = {
  _init (emailClient = sendgrid, ForgotPass = ForgotPasswordModel, Users = UserModel) {
    bindFunctions(this)

    emailClient.setApiKey(process.env.SENDGRID_API_KEY)
    this.emailClient = emailClient
    this.ForgotPass = ForgotPass
    this.Users = Users
    this.validateCode = this.validateCode.bind(this)
    return this
  },

  _insertOrUpdateVerificationCode (email, code) {
    return this.ForgotPass.findOneAndUpdate({email}, {$set: { email, code }}, {upsert: true, 'new': true}).exec()
  },

  _generateSixDigitCode () {
    return Math.floor(Math.random() * 900000) + 100000
  },

  _checkIfUserExists (email) {
    return this.Users.findOne({email}).exec()
  },

  async sendVerificationCodeEmail (req, res) {
    const email = req.body.email

    try {
      await this._checkIfUserExists(email)
      const code = this._generateSixDigitCode()
      await this._insertOrUpdateVerificationCode(email, code)

      const text = `Your validation code is: ${code}`
      const message = {
        from: 'team.calltocode@gmail.com',
        to: email,
        subject: `Validation code for ${email}`,
        html: `<strong>${text}</strong>`,
        text
      }
      this.emailClient.send(message)

      res.status(200).send({ status: 200 })
    } catch (error) {
      res.status(500).send({ status: 500 })
    }
  },

  validateCode (req, res) {
    const {email, code} = req.body

    this.ForgotPass.findOne({email, code}).exec()
      .then(user => {
        if (user) {
          user.remove()
          return res.status(200).json({status: 200})
        }
        res.status(404).json({error: 'Invalid code or email'})
      })
      .catch(() => res.status(404).json({error: 'Invalid code or email'}))
  }
}

module.exports = forgotPasswordController
