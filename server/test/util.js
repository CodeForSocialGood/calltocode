const MongodbMemoryServer = require('mongodb-memory-server').default
const mongoose = require('mongoose')

const app = require('./app')
const Project = require('../database/models/Project')
const User = require('../database/models/User')
const seedProjects = require('../../db/seedData/projects.json')
const seedUsers = require('../../db/seedData/users.json')

const mongod = new MongodbMemoryServer()

async function before (t) {
  const mongoUri = await mongod.getConnectionString()
  const options = { useMongoClient: true }
  mongoose.Promise = global.Promise
  mongoose.connect(mongoUri, options)
}

async function beforeEach (t) {
  for (const seedProject of seedProjects) {
    const project = new Project(fix(seedProject))
    await project.save()
  }

  for (const seedUser of seedUsers) {
    const user = new User(fix(seedUser))
    await user.save()
  }

  t.context.app = app
}

async function afterEach (t) {
  await Project.remove()
  await User.remove()
}

async function after (t) {
  mongoose.disconnect()
  mongod.stop()
}

function fix (data) {
  if (data['_id']['$oid']) data['_id'] = data['_id']['$oid']
  return data
}

module.exports = { before, beforeEach, afterEach, after }
