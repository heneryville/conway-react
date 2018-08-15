import React, { Component } from 'react';

class Grid extends Component {

  render() {
    return (
      <canvas className="Grid" ref="canvas" width={1200} height={800}></canvas>
    );
  }

  draw() {
    const width = this.width || 1200;
    const height = this.height || 1200;
    const ctx = this.refs.canvas.getContext('2d');
    const grid = this.props.grid;


    const dw = width / grid.width;
    const dh = height / grid.height;

    ctx.strokeStyle = 'white';
    for(let y=0; y<grid.height; ++y) {
      for(let x=0; x<grid.width; ++x) {
        let fill = grid.at(x,y) ? '#2f2' : '#222';
        ctx.fillStyle = fill;
        ctx.fillRect( x * dw +1, y * dh, dw-1, dh-1 )
        ctx.strokeRect( x * dw, y * dh, dw, dh )
      }
    }
  }

  componentDidMount() { this.draw(); }
  componentDidUpdate() { this.draw(); }

}

export default Grid;
