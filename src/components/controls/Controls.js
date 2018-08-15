import React, {Component} from 'react'
import "./Controls.css"

class Controls extends Component {

  render() {
    return (<div className="Controls">
            Iteration: {this.props.grid.iteration}
            </div>);
  }

}

export default Controls;
