import { GET_TODO, ADD_TODO, DELETE_TODO, UPDATE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

// @TODO 用 status 而非 completed
const mockData = [
  {
    text: '正在做的任务',
    completed: false,
    confirmed: true,
    _id: 1,
    username: 'lily'
  },
  {
    text: '新建的任务',
    completed: false,
    confirmed: false,
    _id: 2,
    username: 'lily'
  },
  {
    text: '已完成的任务',
    completed: true,
    confirmed: true,
    _id: 3,
    username: 'lily'
  },
]

const initialState = []
// const initialState = mockData

export default function todos(state = initialState, action) {
  switch (action.type) {

    case GET_TODO:
      return action.tasks

    case ADD_TODO:
      return [
        {
          _id: state.reduce((maxId, todo) => Math.max(todo._id, maxId), -1) + 1,
          completed: false,
          text: action.text,
          username: action.username
        },
        ...state
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo._id !== action._id
      )

    case UPDATE_TODO:
      return state.map(todo =>
        todo._id === action.id ?
          { ...action.task } :
          todo
      )
	
    case EDIT_TODO:
      return state.map(todo =>
        todo._id === action._id ?
          { ...todo, text: action.text } :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo._id === action._id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
