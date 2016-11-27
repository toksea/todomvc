import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'
import LogIn from './LogIn'
import { isEmpty } from 'lodash' 

export default class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  handleSave = text => {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  handleLogIn = pass => {
    if (pass.length !== 0) {
      this.props.logIn(pass)
    }
  }
  
  render() {
    const {user} = this.props
    return (
      <header className="header">
        <h1>todos</h1>
	{isEmpty(user) ?
	  <LogIn newTodo
                       onSubmit={this.handleLogIn}
                       placeholder="请输入接头暗号给 Lily 派单" />
          : <TodoTextInput newTodo
                       onSave={this.handleSave}
                       placeholder="想求 Lily 干点嘛？" />
	}
      </header>
    )
  }
}
