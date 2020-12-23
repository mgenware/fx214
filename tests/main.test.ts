import * as assert from 'assert';
import buildTree from '..';

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

it('Non-object', () => {
  assert.deepEqual(buildTree('abc'), 'abc');
});

it('Ignore non-string leaves', () => {
  const f = () => 's';
  assert.deepEqual(
    buildTree({
      a: {
        b: 'haha',
        c: f,
      },
    }),
    {
      a: {
        b: '/a/haha',
        c: f,
      },
    },
  );
});
