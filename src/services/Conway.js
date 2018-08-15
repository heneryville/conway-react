'use strict'
import _ from 'lodash';

const neighborOffsets = [ [-1,-1], [0,-1],[1,-1], [-1,0], [1,0],[-1,1], [0,1],[1,1] ];

class Conway {
  constructor(grid,iteration) {
    this.grid = grid;
    this.iteration = iteration || 0;
  }

  get width (){ return this.grid[0].length; }
  get height (){ return this.grid.length; }

  isEqual(other) {
    if(other.width !== this.width || other.height !== this.height) return false;
    for(var i=0; i<this.height; ++i) {
      for(var j=0; j<this.width; ++j) {
          if(other.at(j,i) != this.at(j,i)) return false;
      }
    }
    return true;
  }

  toString() {
    var sb = '';
    for(var i=0; i<this.height; ++i) {
      for(var j=0; j<this.width; ++j) {
        sb += this.at(j,i) ? '1' : '0';
      }
      sb += '\n';
    }
    return sb;
  }

  toOnelineString() {
    var sb = '';
    for(var i=0; i<this.height; ++i) {
      for(var j=0; j<this.width; ++j) {
        sb += this.at(j,i) ? '1' : '0';
      }
      if(i < this.height -1) sb += '\\';
    }
    return sb;
  }

  at(x,y) {
    if(_.isArray(x)) return this.grid[x[1]][x[0]]; //In array notation
    return this.grid[y][x];
  }

  //Gives a list of neighbors, encoded as [x,y]
  neighbors(x,y) {
    const width = this.width;
    const height = this.height;
    return neighborOffsets.map(p => [p[0] + x, p[1] + y] ).filter(p => p[0] >= 0 && p[1] >= 0 && p[0] < width && p[1] < height );
  }

  // Gives the number of populated neighbors
  crowding(x,y) {
    return this.neighbors(x,y).reduce((acc,p) => acc + (this.at(p) ? 1 : 0)  ,0)
  }

  willBeAlive(x,y) {
    let crowding = this.crowding(x,y);
    let isAlive = this.at(x,y);
    if(isAlive)  return crowding == 2 || crowding == 3;
    return crowding == 3;
  }

  next() {
    const width = this.width;
    const height = this.height;
    const next = [];
    for(let i=0; i<height; ++i) {
      let row = [];
      next.push(row);
      for(var j=0; j<width; ++j) {
        row.push(this.willBeAlive(j,i));
      }
    }
    return new Conway(next,this.iteration+1);
  }
}

Conway.parse = function(grid) {
  grid = grid.split('\n').map(x => x.split('').map(y => y == '1'))
  return new Conway(grid);
}

Conway.random = function(width,height,density) {
  density = density || .1;
  let grid = [];
  for(let i=0; i<height; ++i) {
    let row = [];
    grid.push(row);
    for(var j=0; j<width; ++j) {
      row.push(Math.random() <= density);
    }
  }
  return new Conway(grid);
}

export default Conway
