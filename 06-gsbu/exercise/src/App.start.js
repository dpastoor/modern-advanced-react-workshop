/*

EXERCISE: Edit `PinScrollToBottom` to manage the window's scroll position.
Whenever new messages come in, scroll to the bottom.  However, if the user has
scrolled up at all, *don't* scroll them done cause that's super annoying.

Tips:

- You can scroll down with:
  `document.documentElement.scrollTop = document.documentElement.scrollHeight`
- Measure the scroll position in `getSnapshotBeforeUpdate`
- You'll need these measurements:
  `let { scrollTop, scrollHeight, clientHeight} = document.documentElement`

*/

import React, { Component } from "react";
import subscribeToMessages from "./lib/messages";
import FadeIn from "./lib/FadeIn";

class PinScrollToBottom extends Component {
  scroll() {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
  }
  componentDidMount() {
    this.scroll()
  }
  getSnapshotBeforeUpdate() {
    let { scrollTop, scrollHeight, clientHeight} = document.documentElement
    console.log("st", scrollTop, 'sh', scrollHeight,'ch', clientHeight)
    // scrollTop --> height of top of Viewport related to full page
    // clientHeight length of visible client
    // scrollHeight length of entire page
    if (scrollTop + clientHeight + 10 >= scrollHeight) {
      return(true)
    }
    return(false)

  }
  componentDidUpdate(prevProps, prevState, atBottom) {
    if (atBottom) {
      this.scroll()
    }
  }
  render() {
    return this.props.children;
  }
}

class App extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    subscribeToMessages(message => {
      this.setState({
        messages: this.state.messages.concat([message])
      });
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="app">
        <div className="link">
          <a href="https://www.youtube.com/watch?v=VKHFZBUTA4k&list=RDVKHFZBUTA4k">
            Sketch on YouTube
          </a>
        </div>
        <PinScrollToBottom>
          <ol className="messages">
            {messages.map((message, index) => (
              <FadeIn key={index}>
                <li className="message">
                  <div
                    className="avatar"
                    style={{
                      backgroundImage: `url(${message.avatar})`
                    }}
                  />
                  <div className="text">{message.text}</div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </PinScrollToBottom>
      </div>
    );
  }
}

export default App;
