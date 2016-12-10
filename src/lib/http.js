import axios from 'axios'

const instance = axios.create({
  baseURL: '/api/v1/',
})

// https://github.com/mzabriskie/axios#handling-errors
/*
instance.defaults.validateStatus = function (status) {
    return status < 500; // Reject only if the status code is greater than or equal to 500
  }
})  
*/

export default instance
