const path = require('path')

const indexController = {
  _init (pathResolver = path) {
    this.indexFilePath = pathResolver.join(__dirname, '..', '..', '..', 'client', 'dist', 'index.html')

    this.getIndexPage = this.getIndexPage.bind(this)
    return this
  },

  getIndexPage (req, res) {
    res.sendFile(this.indexFilePath)
  }
}

module.exports = indexController
