import * as assert from 'assert';
import buildTree from '..';

it('One level', () => {
  assert.deepStrictEqual(
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
  assert.deepStrictEqual(
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
  assert.deepStrictEqual(buildTree('abc'), 'abc');
});

it('Ignore non-string leaves', () => {
  const f = () => 's';
  assert.deepStrictEqual(
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

it('Customize content strings', () => {
  assert.deepStrictEqual(
    buildTree({
      a: {
        forum: {
          add: 'add',
          del: 'delete',
          __content__: '<>',
        },
      },
    }),
    {
      a: {
        forum: {
          add: '/a/<>/add',
          del: '/a/<>/delete',
          __content__: '<>',
        },
      },
    },
  );
});
