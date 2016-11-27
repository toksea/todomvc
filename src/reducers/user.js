import { LOG_IN } from '../constants/ActionTypes'

const initialState = {}
// @TODO 从 localstorage 读取

export default function user(state = initialState, action) {
  switch (action.type) {

    case LOG_IN:
      return action.user
      
    default:
      return state
  }
}
