import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import Hammer from 'react-hammerjs'
import {flow} from 'lodash';

import { DragSource, DropTarget } from 'react-dnd';

// 因为要做 item 排序，而非 item 转移列表，所以 item 既是 drag 的对象
// （DragSource），又是 drag 的目的地（DragTarget）

class TodoItem extends Component {
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
    const { isDragging, connectDragSource,
            connectDropTarget,
            todo, isEditable,
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

    return connectDragSource(
      connectDropTarget(
          <li style={{opacity: isDragging ? 0.5 : 1}} className={classnames({
            completed: todo.completed,
            confirmed: todo.confirmed,
            editing: this.state.editing
          })}>
          {element}
        </li>
      )
    )
  }
}

//////////// drag source 的配置

/**
 * Implements the drag source contract.
 */
const cardSource = {
  // What is an item? An item is a plain JavaScript object
  // describing what's being dragged
  // e.g. { cardId: 42 }
  beginDrag(props) {
    console.log('@begin drag', props);

    return {
      id: props.todo._id
    };
  },

  /*
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    console.log('@end drag', {
      props, item, dropResult
    });


    // CardActions.moveCardToList(item.id, dropResult.listId);
  }
  */

};

// import { ItemTypes } from './Constants';
// What is a type, then? A type is a string (or a symbol) uniquely
// identifying a whole class of items in your application. In a Kanban
// board app, you might have a 'card'
// Types are useful because, as your app grows, you might want to make
// more things draggable,

/**
 * Specifies the props to inject into your component.
 */

function collect(connect, monitor) {

  // The monitors let you update the props of your components in
  // response to the drag and drop state changes.

  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const DragType = 'TodoItem'


/////////////////  drag target 的配置
const squareTarget = {
  canDrop(props) {
    console.log('@candrop');
    // return canMoveKnight(props.x, props.y);
    return true
  },

  drop(props, monitor) {
    console.log('@drop', props.todo, monitor.getItem())
    // moveKnight(props.x, props.y);
    // @todo 修改排序
  }
};

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

export default flow(
  DragSource(DragType, cardSource, collect),
  DropTarget(DragType, squareTarget, targetCollect)
)(TodoItem);
