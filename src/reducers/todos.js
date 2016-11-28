import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

// @TODO 用 status 而非 completed
const initialState = [
  {
    text: '正在做的任务',
    completed: false,
    confirmed: true,
    id: 1,
    username: 'lily'
  },
  {
    text: '新建的任务',
    completed: false,
    confirmed: false,
    id: 2,
    username: 'lily'
  },
  {
    text: '已完成的任务',
    completed: true,
    confirmed: true,
    id: 3,
    username: 'lily'
  },
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
          username: action.username
        },
        ...state
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
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
