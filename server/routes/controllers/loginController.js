const UserModel = require('../../database/models/User')

const loginController = {
  _init (User = UserModel) {
    this.User = User
    return this
  },

  login (req, res) {
    const {email, password} = req.body

    this.User.findOne({ email }, (error, user) => {
      if (error) {
        console.error(error)
        return res.sendStatus(403)
      }

      if (user && password === user.password) {
        res.setHeader('Content-Type', 'application/json')
        user.token = user.generateJWT()
        return res.send(user.toJSON())
      } else if (password !== user.password) {
        res.statusMessage = 'Wrong Password'
      } else {
        res.statusMessage = 'Wrong Email'
      }

      res.sendStatus(403)
    })
  }
}

module.exports = loginController
