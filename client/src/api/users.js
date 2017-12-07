import apiRequest from './lib/apiRequest'

const usersApiClient = {
  current (apiOptions) {
    return apiRequest.get('/user', apiOptions)
  },

  // TODO: add apiOptions
  login (email, password) {
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }

    return fetch('/api/users/login', options)

    // const body = { email, password }
    // return apiRequest.post('/users/login', body)
  },

  signup (apiOptions, user) {
    const body = { user }
    return apiRequest.post('/users', apiOptions, body)
  },

  update (apiOptions, user) {
    const body = { user }
    return apiRequest.put('/user', apiOptions, body)
  }
}

export default usersApiClient
