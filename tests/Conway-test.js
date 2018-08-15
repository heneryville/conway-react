'use strict'
const Conway = require('../lib/Conway');
const assert = require('chai').assert;

describe('Conway',function(){

  describe('bounds',function(){
    itIs('000\n000\n000',3,3);
    itIs('0000\n0000\n0000',4,3);

    function itIs(grid,width,height) {
        grid = parse(grid);
      it(`${grid.toOnelineString()} = ${width}x${height}`,function(){
        assert.equal(width,grid.width)
        assert.equal(height,grid.height)
      })
    }
  });

  describe('isEqual',function(){
    itIs('000\n000\n000','000\n000\n000',true);
    itIs('000\n000\n000','000\n000\n001',false);
    itIs('100\n000\n000','100\n000\n000',true);

    function itIs(prior,next,expected) {
      prior = parse(prior);
      next = parse(next);

      it(`${prior.toOnelineString()} ${expected ? '=' : '!='} ${next.toOnelineString()}`,function(){
        if(expected) assert.isTrue(prior.isEqual(next))
        else assert.isFalse(prior.isEqual(next))
      })


    }
  });

  describe('neighbors',function(){
    itIs(1,1,[ [0,0], [1,0],[2,0], [0,1], [2,1],[0,2], [1,2],[2,2] ]);
    itIs(0,0,[ [1,0], [0,1],[1,1] ]);
    itIs(2,2,[ [1,1], [2,1],[1,2] ]);
    itIs(2,1,[ [1,0], [2,0],[1,1],[1,2], [2,2] ]);

    function itIs(x,y,expected) {
      it(`(${x} ${y}) => ${expected}`,function(){
        var actual = parse('000\n000\n000').neighbors(x,y);
        assert.deepEqual(expected,actual);
      })
    }
  });

  describe('crowding',function(){
    itIs('000\n000\n000',0,1,1);
    itIs('000\n010\n000',0,1,1);
    itIs('000\n100\n000',1,1,1);
    itIs('111\n101\n111',8,1,1);
    itIs('000\n011\n000',1,2,1);

    function itIs(grid,expected,x,y) {
      grid = parse(grid);
      it(`${grid.toOnelineString()} => ${expected}`,function(){
        let actual = grid.crowding(x,y);
        assert.equal(actual,expected);
      })

    }
  });

  describe('willBeAlive',function(){
    itIs('000\n000\n000',false,1,1);
    itIs('000\n010\n000',false,1,1);
    itIs('000\n110\n000',false,1,1);
    itIs('000\n111\n000',true,1,1);
    itIs('010\n111\n000',true,1,1);
    itIs('010\n111\n010',false,1,1);

    itIs('000\n001\n000',false,2,1);
    itIs('000\n011\n000',false,2,1);
    itIs('000\n011\n001',true,2,1);

    function itIs(grid,expected,x,y) {
      grid = parse(grid);
      it(`${grid.toOnelineString()} => ${expected} @ (${x},${y})`,function(){
        let actual = grid.willBeAlive(x,y);
        assert.equal(actual,expected);
      })

    }
  });

  describe('next',function(){
    itIs('000\n000\n000','000\n000\n000');
    itIs('000\n010\n000','000\n000\n000');
    itIs('000\n011\n000','000\n000\n000');
    itIs('000\n111\n000','010\n010\n010');
    itIs('010\n111\n010','111\n101\n111');
    function itIs(prior,next) {
      prior = parse(prior);
      next = parse(next);
      it(`${prior.toOnelineString()} => ${next.toOnelineString()}`,function(){
        let actual = prior.next();
        if(!next.isEqual(actual)) {
          console.log(prior.toOnelineString());
          console.log(actual.toOnelineString());
        }
        assert.isTrue(next.isEqual(actual));
      })

    }
  });

  function parse(grid) {
    grid = grid.split('\n').map(x => x.split('').map(y => y == '1'))
    return new Conway(grid);
  }

})


