import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import applicationsApiClient from '../../api/applications'
import * as actionTypes from './types'

export default class ApplicationActionCreator {
  static getNotifications (user) {
    return (dispatch, getState) => {
      dispatch({type: actionTypes.FETCH_NOTIFICATIONS_START})
      try {
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const applications = applicationsApiClient.getNotifications(apiOptions)
        dispatch({type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS, payload: applications})
      } catch (error) {
        dispatch({type: actionTypes.FETCH_NOTIFICATIONS_ERROR, payload: error, error: true})
      }
    }
  }
}
