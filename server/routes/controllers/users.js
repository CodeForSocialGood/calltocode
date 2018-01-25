import bindFunctions from '../../lib/bindFunctions'
import UserModel from '../../database/models/User'
import ForgotPasswordModel from '../../database/models/ForgotPassword'
import { emailConfig } from '../../config'
import { ForbiddenError, NotFoundError } from '../../lib/errors'

export default {
  _init (Users = UserModel, ForgotPassword = ForgotPasswordModel, emailClient = emailConfig) {
    bindFunctions(this)

    this.Users = Users
    this.ForgotPassword = ForgotPassword
    this.emailClient = emailClient
    return this
  },

  async getCurrent (req, res) {
    const id = req.payload.id
    const user = await this.Users.findById(id)

    if (!user) throw new NotFoundError()

    return res.status(200).json(user.toJSON())
  },

  async putCurrent (req, res) {
    const id = req.payload.id
    const user = await this.Users.findById(id)

    if (!user) throw new NotFoundError()

    const newUser = Object.assign(user, { ...req.body })
    await newUser.save()

    return res.status(200).json(newUser.toJSON())
  },

  async getUsers (req, res) {
    const query = {}
    const limit = Number(req.query.limit) || 20
    const offset = Number(req.query.offset) || 0
    const sort = { createdAt: 'desc' }

    const users = await this.Users
      .find(query)
      .limit(limit)
      .skip(offset)
      .sort(sort)

    return res.status(200).json(users.map(user => user.toJSON()))
  },

  async createUser (req, res) {
    const user = new this.Users(req.body)
    const newUser = await user.save()

    return res.status(200).json(newUser.toJSON())
  },

  async getUser (req, res) {
    const user = req.user

    return res.status(200).json(user.toJSON())
  },

  async putUser (req, res) {
    const user = Object.assign(req.user, { ...req.body })
    const newUser = await user.save()

    return res.status(200).json(newUser.toJSON())
  },

  async login (req, res) {
    const { email, hash } = req.body
    const user = await this.Users.findOne({ email })

    if (!user || user.hash !== hash) throw new ForbiddenError('Invalid email or password')

    return res.status(200).json(user.toJSON())
  },

  async getSalt (req, res) {
    const { email } = req.query
    const user = await this.Users.findOne({ email })

    if (!user) throw new NotFoundError()

    return res.status(200).json({ salt: user.salt })
  },

  async changePassword (req, res) {
    const { email, salt, hash } = req.body
    const user = await this.Users.findOne({ email })

    if (!user) throw new NotFoundError()

    user.salt = salt
    user.hash = hash

    await user.save()

    return res.status(200).json(user.toJSON())
  },

  async createCode (req, res) {
    const email = req.body.email
    const user = await this.Users.findOne({ email })

    if (!user) return res.sendStatus(200)

    const code = generateSixDigitCode()
    await this.ForgotPassword.findOneAndUpdate(
      { email },
      { $set: { email, code } },
      { upsert: true, 'new': true }
    )

    const text = `Your validation code is: ${code}`
    const message = {
      from: 'team.calltocode@gmail.com',
      to: email,
      subject: `Validation code for ${email}`,
      html: `<strong>${text}</strong>`,
      text
    }

    this.emailClient.send(message)

    return res.sendStatus(200)
  },

  async validateCode (req, res) {
    const { email, code } = req.body
    const savedCode = await this.ForgotPassword.findOne({ email, code })

    if (!savedCode) throw new NotFoundError('Invalid code')

    savedCode.remove()

    return res.sendStatus(200)
  },

  async userById (req, res, next, id) {
    const user = await this.Users.findById(id)

    if (!user) throw new NotFoundError()

    req.user = user
    next()
  }
}

function generateSixDigitCode () {
  return Math.floor(Math.random() * 900000) + 100000
}
