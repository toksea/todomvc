import * as types from '../constants/ActionTypes'
import * as perms from '../constants/Perms'
import { isEmpty } from 'lodash'
import http from '../lib/http'


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

    http.post('/user/login', {
      pass
    }).then((res) => {
      // {
      //        data: {}, // `data` is the response that was provided by the server
      //        status: 200, // `status` is the HTTP status code from the server response
      //        statusText: 'OK', // `statusText` is the HTTP status message from the server response
       //       headers: {}, // `headers` the headers that the server responded with
      //        config: {}, // `config` is the config that was provided to `axios` for the request
      // }


      return res.data

    }).then((user) => {

      console.log(user);
      return dispatch({ type: types.LOG_IN, user });

    }).catch((err, res) => {

      if (err.response) {
        const message = err.response.data.message
        return alert(message) // @TODO dispatch
      }
      else {
        return alert('caught', err) // @TODO dispatch
      }
      // @todo 根据错误类型报错

    })
  };
}

