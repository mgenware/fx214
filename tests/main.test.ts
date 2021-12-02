/* eslint-disable import/extensions */
import * as assert from 'assert';
import buildTree from '../dist/main.js';

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

it('Keep input type', () => {
  const input = {
    a: 'aaa',
    b: 'bbb',
  };
  const res = buildTree(input);
  // Must access one of properties of `input`.
  // It compiles if `res` has the same type of `input`.
  assert.strictEqual(res.a, '/aaa');
});

it('Autofill falsy values', () => {
  assert.deepStrictEqual(
    buildTree({
      a: {
        forum: {
          add: 'add',
          b: 0,
          c: null,
          d: '',
          __content__: '<>',
        },
      },
    }),
    {
      a: {
        forum: {
          add: '/a/<>/add',
          b: '/a/<>/b',
          c: '/a/<>/c',
          d: '/a/<>/d',
          __content__: '<>',
        },
      },
    },
  );
});

it('opt.underscoresToHyphens', () => {
  assert.deepStrictEqual(
    buildTree(
      {
        // Key names are also replaced.
        a_b: {
          forum: {
            add: 'add',
            remove: 'remove_item',
            set_item: 0,
            // `__content__` is not affected by `underscoresToHyphens`.
            __content__: '__',
          },
        },
      },
      { underscoresToHyphens: true },
    ),
    {
      a_b: {
        forum: {
          add: '/a-b/__/add',
          remove: '/a-b/__/remove-item',
          set_item: '/a-b/__/set-item',
          __content__: '__',
        },
      },
    },
  );
});

it('opt.prefix', () => {
  assert.deepStrictEqual(
    buildTree(
      {
        a: {
          forum: {
            add: 'add',
            del: 'delete',
            __content__: '<>',
          },
        },
      },
      { prefix: '->' },
    ),
    {
      a: {
        forum: {
          add: '->/a/<>/add',
          del: '->/a/<>/delete',
          __content__: '<>',
        },
      },
    },
  );
});
