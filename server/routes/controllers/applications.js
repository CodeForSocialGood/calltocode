import bindFunctions from '../../lib/bindFunctions'
import ApplicationModel from '../../database/models/Application'
import mailer from '../../lib/mailer'

export default {
  _init (Applications = ApplicationModel) {
    bindFunctions(this)

    this.Applications = Applications
    return this
  },

  async getApplications (req, res) {
    const query = {}
    const limit = Number(req.query.limit) || 5
    const offset = Number(req.query.offset) || 0
    const sort = { createdAt: 'desc' }

    const { volunteer, project } = req.query

    if (typeof volunteer !== 'undefined') {
      query.volunteer = volunteer
    }

    if (typeof project !== 'undefined') {
      query.project = project
    }

    const applications = await this.Applications
      .find(query)
      .limit(limit)
      .skip(offset)
      .sort(sort)
      .populate('project')

    return res.status(200).json(applications.map(application => application.toJSON()))
  },

  async createApplication (req, res) {
    const application = new this.Applications(req.body)
    const newApplication = await application.save()
    await mailer.sendApplication(req.body.volunteer, req.body.project)

    return res.status(200).json(newApplication.toJSON())
  }
}