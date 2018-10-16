/*

Instructions:

Goal: Update the document title to say "Todos (todos.length)" as the data changes.

- Make a `<DocumentTitle/>` component
- Pass it a prop with the string for the title
- Use lifecycle hooks to keep it up to date with the data

Tips:

- You'll need two lifecycle hooks
- You'll need string interpolation `it looks ${like} this`
- the DOM API to update the title is `document.title = "some string"`

*/

import React, { Component } from "react";

// using general children, rather than an incomplete prop,
// we keep the implementation generic so it can be used
// here or in other situations where we just generically want
// to set the title
class DocumentTitle extends Component {
  _updateDocumentTitle() {
    document.title = this.props.children;
  }
  componentDidMount() {
    this._updateDocumentTitle();
  }
  componentDidUpdate(prevProps) {
    // if don't check this, will cause this to be run every time this
    // component is updated, which _may_ cause performance problems
    if (prevProps.children !== this.props.children) {
      this._updateDocumentTitle();
    }
  }
  render() {
    return null;
  }
}
class App extends Component {
  state = {
    completed: 0,
    todos: ["Wake up", "Eat a taco", "Avoid twitter"]
  };

  render() {
    let { todos, completed } = this.state;
    let incomplete = todos.length - completed;

    return (
      <div className="app">
        <h1>Todos ({incomplete})</h1>
        <DocumentTitle>{`Todos (${incomplete})`}</DocumentTitle>
        <form
          onSubmit={event => {
            let todo = event.target.elements[0].value;
            event.preventDefault();
            event.target.reset();
            this.setState(state => {
              return { todos: state.todos.concat([todo]) };
            });
          }}
        >
          <input type="text" /> <button type="submit">Add</button>
        </form>

        <ul>
          {todos.map(todo => (
            <li>
              <label>
                <input
                  type="checkbox"
                  onChange={event => {
                    let checked = event.target.checked;
                    this.setState(state => {
                      return {
                        completed: checked
                          ? state.completed + 1
                          : state.completed - 1
                      };
                    });
                  }}
                />{" "}
                {todo}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
