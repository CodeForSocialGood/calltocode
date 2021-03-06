import mongoose from 'mongoose'

const ProjectSchema = mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  name: String,
  role: String,
  email: String,
  imageUrl: String,
  causes: [{
    type: String,
    enum: ['Animal', 'Environment', 'International NGO', 'Health', 'Education', 'Arts & Culture', 'Other']
  }],
  technologies: [{
    type: String,
    enum: ['JavaScript', 'Ruby', 'Java', 'Python', 'PHP', 'C++', 'Other']
  }],
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }]
}, { timestamps: true })

ProjectSchema.methods.toJSON = function () {
  return {
    id: this._id,
    organization: this.organization,
    name: this.name,
    role: this.role,
    email: this.email,
    imageUrl: this.imageUrl,
    causes: this.causes,
    technologies: this.technologies,
    applications: this.applications,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

export default mongoose.model('Project', ProjectSchema)
