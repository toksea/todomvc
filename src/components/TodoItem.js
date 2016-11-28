import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

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

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, isEditable, completeTodo, deleteTodo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      if (isEditable) {
        element = (
          <div className="view">
            <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => completeTodo(todo.id)} />
            <label onDoubleClick={this.handleDoubleClick}>
              {todo.text}
            </label>
            <button className="destroy"
                  onClick={() => deleteTodo(todo.id)} />
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
