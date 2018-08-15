import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Favicon extends Component {

  constructor(props) {
    super(props);
    this.state = {isUp: true};
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 250);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    var element = ReactDOM.findDOMNode(this);
    document.getElementById('favicon').href = element.href;
  }

  tick(){
    this.setState({isUp: !this.state.isUp});
  }

  render() {
    return (
      <link rel="shortcut icon" href={ this.state.isUp? '/up.ico' : '/side.ico'} />
    );
  }
}

export default Favicon;
