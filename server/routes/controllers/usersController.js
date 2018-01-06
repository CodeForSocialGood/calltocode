const UserModel = require('../../database/models/User')

const usersController = {
  _init (Users = UserModel) {
    this.Users = Users

    this.getUsers = this.getUsers.bind(this)
    this.signup = this.signup.bind(this)
    this.getUser = this.getUser.bind(this)
    this.putUser = this.putUser.bind(this)
    this.getSalt = this.getSalt.bind(this)
    this.login = this.login.bind(this)
    this.changePassword = this.changePassword.bind(this)
    return this
  },

  getUsers (req, res) {
    return this.Users.find().exec((err, users) => {
      if (err) {
        return res.sendStatus(500)
      }

      return res.status(200).json(users.map(user => user.toJSON()))
    })
  },

  signup (req, res) {
    const newUser = new this.Users(req.body.user)

    return newUser.save((err, user) => {
      if (err) {
        return res.sendStatus(500)
      }

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json(user.toJSON())
    })
  },

  getUser (req, res) {
    const id = req.params.id

    this.Users.findById(id).exec((err, user) => {
      if (err) {
        return res.sendStatus(500)
      }

      if (!user) {
        return res.sendStatus(404)
      }

      return res.status(200).json(req.user.toJSON())
    })
  },

  putUser (req, res) {},

  getSalt (req, res) {
    const { email } = req.query
    this.Users.findOne({ email }).exec((err, user) => {
      if (err) {
        return res.status(500).json({ error: '500' })
      }

      if (!user) {
        return res.status(401).json({ error: '401' })
      }

      const { salt } = user
      return res.status(200).json({ salt })
    })
  },

  login (req, res) {
    const { email, hash } = req.body

    this.Users.findOne({ email }).exec((err, user) => {
      if (err) {
        return res.sendStatus(403)
      }

      if (!user) {
        res.statusMessage = 'Wrong email'
        return res.status(403).json({ error: 'Invalid email' })
      } else if (hash !== user.hash) {
        res.statusMessage = 'Wrong password'
        return res.status(403).json({ error: 'Invalid password' })
      }

      return res.status(200).json(user.toJSON())
    })
  },

  changePassword (req, res) {
    const {email, password} = req.body

    var query = {'email': email}
    this.Users.findOneAndUpdate(query, {$set: { password: password }}, {}, function (err, doc) {
      if (err) {
        return res.send(500, { error: err })
      }
      if (doc === null && err === null) {
        return res.send(404, { error: 'No user found. No password updated' })
      }
      return res.send(doc.toJSON())
    })
  }

}

module.exports = usersController
