const config = {
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  getSend () {
    let mail
    switch (process.env.NODE_ENV) {
      case 'test':
      case 'prod':
        mail = require('@sendgrid/mail')
        mail.setApiKey(process.env.SENDGRID_API_KEY)
        return mail.send
      default:
        mail = require('sendmail')({
          devPort: 1025, // Default: False
          devHost: 'localhost' // Default: localhost
        })
        return mail
    }
  }
}

module.exports = config
