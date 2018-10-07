import React, { Component } from "react";
import { Router, Link } from "@reach/router";

const API = "https://contacts.now.sh";

class Fetch extends Component {
  state = {
    error: null,
    data: null,
    url: this.props.url
  };

  // this will prevent multiple renders that happen if we 
  // do this logic in componentDidMount

  // You Probably don't need this unless it is a major performance
  // bottleneck from the extra render
  static getDerivedStateFromProps(props, state) {
    if (props.url !== state.url) {
      // this is basically resetting the state
      return {
        error: null,
        data: null,
        // need the url to be in state so we can do this diff later
        url: props.url
      };
    }
    // 
    return null;
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.fetch();
    }
  }

  async fetch() {
    try {
      let response = await fetch(this.state.url);
      let data = await response.json();
      this.setState({ data });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    return this.props.children(this.state);
  }
}

let Home = () => (
  <div>
    <h2>Welcome!</h2>
    <p>Please select a contact.</p>
  </div>
);

let Contact = ({ contactId }) => (
  <Fetch url={`${API}/contacts/${contactId}`}>
    {({ error, data }) =>
      data ? (
        <div>
          <h2>Contact: {data.contact.first}</h2>
          <img
            alt={`${data.contact.first} smiling`}
            height="100"
            src={data.contact.avatar}
          />
        </div>
      ) : error ? (
        <div>ERROR! {error.message}</div>
      ) : (
        <div>Loading...</div>
      )
    }
  </Fetch>
);

let App = ({ children, contacts }) => (
  <div>
    <h1>Address Book</h1>
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          <Link to={`contact/${contact.id}`}>
            {contact.first} {contact.last}
          </Link>
        </li>
      ))}
    </ul>
    {children}
  </div>
);

export default () => (
  <Fetch url={`${API}/contacts`}>
    {({ error, data }) =>
      data ? (
        <Router>
          <App path="/" contacts={data.contacts}>
            <Home path="/" />
            <Contact path="contact/:contactId" />
          </App>
        </Router>
      ) : error ? (
        <div>ERROR! {error.message}</div>
      ) : (
        <div>Loading...</div>
      )
    }
  </Fetch>
);
