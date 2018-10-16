import React from "react";
import createMediaListener from "./lib/createMediaListener";
import { Galaxy, Trees, Earth } from "./lib/screens";
import { CSSTransition } from "react-transition-group";


// queries sets up a closure that contains the queries
// and returns a function that consumes a component
// the component then gets called with the media prop
// passed in
const withMedia = queries => Comp => {
  const media = createMediaListener(queries);
  return class WithMedia extends React.Component {
    // can control the displayname within react dev tools
    static displayName = `withMedia${Comp.displayName || Comp.name}`
  state = {
    media: media.getState()
  };

  componentDidMount() {
    media.listen(media => this.setState({ media }));
  }

  componentWillUnmount() {
    media.dispose();
  }
render() {
  // also want to pass down any props passed to this HOC
  return <Comp media={this.state.media} {...this.props} />
}
  }
}
class App extends React.Component {
  render() {
    const { media } = this.props;

    return (
      <CSSTransition classNames="fade" timeout={300}>
        {media.big ? (
          <Galaxy key="galaxy" />
        ) : media.tiny ? (
          <Trees key="trees" />
        ) : (
          <Earth key="earth" />
        )}
      </CSSTransition>
    );
  }
}

export default withMedia({
    big: "(min-width : 1800px)",
    tiny: "(max-width: 1000px)"
})(App);
