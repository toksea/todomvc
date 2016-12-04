import * as types from '../constants/ActionTypes'
import * as perms from '../constants/Perms'
import { isEmpty } from 'lodash'
import http from '../lib/http'

export const getTodo = () => {
  return (dispatch, getState) => {

    http.get('/task').then(res => {
      return res.data
    }).then((tasks) => {

      console.log('tasks', tasks);
      return dispatch({ type: types.GET_TODO, tasks})

    }).catch((error) => {

      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        let message = ' [' + error.response.status + ']';
        if (error.response.data && error.response.data.message) {
          message = error.response.data.message + message;
        }
        else {
          message = '网络错误' + message;
        }
        alert(message) // @TODO dispatch

      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        alert(error.message)

      }
      console.log(error.config);

    })
    

  }
}


export const addTodo = (text) => {
  return (dispatch, getState) => {

    http.post('/task', {
      text
    }).then(res => {
      return res.data
    }).then((task) => {

      console.log('task', task);
      return dispatch({ type: types.ADD_TODO, ...task})

    }).catch((error) => {

      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        let message = ' [' + error.response.status + ']';
        if (error.response.data && error.response.data.message) {
          message = error.response.data.message + message;
        }
        else {
          message = '网络错误' + message;
        }
        alert(message) // @TODO dispatch

      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        alert(error.message)

      }
      console.log(error.config);

    })
    

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
      //    data: {},    // `data` is the response that was provided by the server
      //    status: 200, // `status` is the HTTP status code from the server response
      //    statusText: 'OK', // `statusText` is the HTTP status message from the server response
      //   headers: {}, // `headers` the headers that the server responded with
      //    config: {},  // `config` is the config that was provided to `axios` for the request
      // }
      return res.data

    }).then((user) => {

      console.log(user);
      return dispatch({ type: types.LOG_IN, user });

    }).catch((error) => {

      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        let message = ' [' + error.response.status + ']';
        if (error.response.data && error.response.data.message) {
          message = error.response.data.message + message;
        }
        else {
          message = '网络错误' + message;
        }
        alert(message) // @TODO dispatch

      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        alert(error.message)

      }
      console.log(error.config);

    })
  };
}
