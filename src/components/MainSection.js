import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_CONFIRMED, SHOW_ACTIVE } from '../constants/TodoFilters'
import * as perms from '../constants/Perms'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed,
  [SHOW_CONFIRMED]: todo => todo.confirmed
}

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.actions.getTodo()
  }

  state = { filter: SHOW_ALL }

  handleClearCompleted = () => {
    this.props.actions.clearCompleted()
  }

  handleShow = filter => {
    this.setState({ filter })
  }

  renderToggleAll(completedCount) {
    // 该功能不适用，且对登录 UI 造成麻烦，所以先注释
    const { todos, actions } = this.props
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={actions.completeAll} />
      )
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      )
    }
  }

  testEditable(todo, user) {
    return user.perm === perms.ADMIN || user.name === todo.username
  }

  render() {
    const { user, todos, actions } = this.props
    const { filter } = this.state

    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        {/* this.renderToggleAll(completedCount) */}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem isEditable={this.testEditable(todo, user)} key={todo._id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}
