import * as types from '../constants/ActionTypes'
import * as perms from '../constants/Perms'
import { isEmpty } from 'lodash'

export const addTodo = (text, user) => {
  return (dispatch, getState) => {

    const { user } = getState();
    
    return dispatch({ type: types.ADD_TODO, text, username: user.name })
    
  }
}
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })

export const logIn = pass => {
  return (dispatch, getState) => {

    console.log(pass);
    
    // const { counter } = getState();
    let user = {}
    if (pass === '1') {
      user = {
	name: 'lily',
	perm: perms.ADMIN,
      }
    }
    if (pass === 'q') {
      user = {
	name: 'pp',
	perm: perms.USER,
      }
    }
    console.log(user);
    console.log(isEmpty(user));
    
    if (!isEmpty(user)) {
      console.log('not empty');
      return dispatch({ type: types.LOG_IN, user });
    }

    alert('暗号有误')

  };
}

