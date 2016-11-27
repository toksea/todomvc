import * as types from '../constants/ActionTypes'

export const addTodo = text => ({ type: types.ADD_TODO, text })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })

export const logIn = pass => {
  return (dispatch, getState) => {

    // const { counter } = getState();
    let user = {}
    if (pass === '123456') {
      user = {
	name: 'lily',
	perm: 'admin',
      }
      return dispatch({ type: types.LOG_IN, user });
    }

    alert('暗号有误')
  };
}

