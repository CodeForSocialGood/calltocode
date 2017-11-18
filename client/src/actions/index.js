import {
  LOGIN,
  LOGOUT,
  POPULATE_OPPS,
  GET_OPPS_APPLIED_FOR,
  UPDATE_USER
} from './types'
import signupApiClient from '../api/signup'
import oppsApiClient from '../api/opportunities'
import userApiClient from '../api/user'
import SignupException from '../exceptions/SignupException'

function login ({ user }) {
  return async dispatch => {
    const response = await oppsApiClient.getOppsAppliedFor(user.opportunitiesAppliedFor)
    if (response.status === 200) {
      return response.json().then(opps => {
        dispatch({
          type: LOGIN,
          payload: { user, opps }
        })
      })
    }
  }
}

function logout () {
  return {
    type: LOGOUT
  }
}

function signup ({ email, password }) {
  return async dispatch => {
    const response = await signupApiClient.signup({ email, password })
    if (response.status === 200) {
      return response.json()
        .then(user => {
          dispatch(login(user))
        })
    }
    throw new SignupException()
  }
}

function applyForProject (project) {
  const projectId = project._id
  // update user in db then update state
  return (dispatch, getState) => {
    const user = getState().login.user
    // get updated user state
    if (user.opportunitiesAppliedFor.indexOf(projectId) === -1) {
      user.opportunitiesAppliedFor = [...user.opportunitiesAppliedFor, projectId]
    }

    userApiClient.updateOppsAppliedFor(projectId, user.id).then(response => {
      if (response.status === 200) {
        dispatch({
          type: UPDATE_USER,
          payload: user
        })
      }
    })
  }
}

function getOppsAppliedFor (user) {
  return async dispatch => {
    console.log(user)
    const response = await oppsApiClient.getOppsAppliedFor(user.opportunitiesAppliedFor)
    if (response.status === 200) {
      console.log(response)
      return response.json().then(opps => {
        dispatch({
          type: GET_OPPS_APPLIED_FOR,
          payload: opps
        })
      })
    }
  }
}

function populateOpps () {
  return async dispatch => {
    const response = await oppsApiClient.getAllOpps()
    if (response.status === 200) {
      return response.json().then(opps => {
        dispatch({
          type: POPULATE_OPPS,
          payload: opps
        })
      })
    }
  }
}

export {
  login,
  logout,
  signup,
  populateOpps,
  applyForProject,
  getOppsAppliedFor
}
