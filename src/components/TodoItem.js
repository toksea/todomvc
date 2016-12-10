import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import Hammer from 'react-hammerjs'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    isEditable: PropTypes.bool.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (_id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(_id)
    } else {
      this.props.editTodo(_id, text)
    }
    this.setState({ editing: false })
  }

  handleTap = () => {
    console.log(arguments)
    alert('hehe')
  }

  render() {
    const { todo, isEditable,
	    completeTodo, deleteTodo,
            tapTodo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo._id, text)} />
      )
    } else {
      if (isEditable) {
        element = (
          <div className="view">
            <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => completeTodo(todo._id)} />
	  
            <Hammer
	      onDoubleTap={this.handleDoubleClick} >
              <label>
                {todo.text}
              </label>
	    </Hammer>
          </div>
        )
      }
      else {
        element = (
          <div className="view">
            <label>
              {todo.text}
            </label>
          </div>
        )
      }
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        confirmed: todo.confirmed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
