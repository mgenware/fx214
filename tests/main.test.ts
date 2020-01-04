import buildTree from '../';
import * as assert from 'assert';

it('One level', () => {
  assert.deepEqual(
    buildTree({
      a: 'aaa',
      b: 'bbb',
    }),
    {
      a: '/aaa',
      b: '/bbb',
    },
  );
});

it('Multiple levels', () => {
  assert.deepEqual(
    buildTree({
      a: 'aaa',
      b: 'bbb',
      sub: {
        child1: {
          a: 'aaa',
          b: 'bbb',
        },
        a: 'aaa',
        b: 'bbb',
      },
    }),
    {
      a: '/aaa',
      b: '/bbb',
      sub: {
        child1: {
          a: '/sub/child1/aaa',
          b: '/sub/child1/bbb',
        },
        a: '/sub/aaa',
        b: '/sub/bbb',
      },
    },
  );
});
