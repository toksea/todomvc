import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

export default class LogIn extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  }

  state = {
    text: this.props.text || ''
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) { // enter pressed (ASCII)
      this.props.onSubmit(text)
      // if (this.props.newTodo) {
      //   this.setState({ text: '' })
      // }
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleBlur = e => {
    const text = e.target.value.trim()
    this.props.onSubmit(text)
  }

  render() {
    return (
      <input className={
        classnames({
	  login: true
        })}
        type="password"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit} />
    )
  }
}
