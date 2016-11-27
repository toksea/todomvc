import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'


// 如果 component 比较简单，可以简写为一个 function，
// function 也是对象，再往上加属性
class App extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }
  
  render() {
    const {user, todos, actions} = this.props
    return (
      <div>
	<Header user={user}
                addTodo={actions.addTodo}
                logIn={actions.logIn}
        />
	<MainSection todos={todos} actions={actions} />
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user,
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
