# fx214

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/MEAN-Module)
[![Build Status](https://github.com/mgenware/fx214/workflows/Build/badge.svg)](https://github.com/mgenware/fx214/actions)
[![npm version](https://img.shields.io/npm/v/fx214.svg?style=flat-square)](https://npmjs.com/package/fx214)
[![Node.js Version](http://img.shields.io/node/v/fx214.svg?style=flat-square)](https://nodejs.org/en/)

Hierarchical URL constants in less code.

## Installation

```sh
yarn add fx214
```

## Usage

```ts
import buildTree from 'fx214';

const urls = buildTree({
  api: {
    private: {
      newComment: 'new-comment',
      newPost: 'new-post',
    },
  },
});

// `urls` will be like:
/**
{
  api: {
    private: {
      newComment: '/api/private/new-comment',
      newPost: '/api/private/new-post',
    },
  },
}
*/
```

To customize the value of a URL component, use the special `__content__` property:

```ts
const urls = buildTree({
  api: {
    p: {
      __content__: 'private',
      newComment: 'new-comment',
      newPost: 'new-post',
    },
  },
});

// `urls` will be like:
/**
{
  api: {
    p: {
      newComment: '/api/private/new-comment',
      newPost: '/api/private/new-post',
    },
  },
}
*/
```

Falsy values are automatically filled with key names:

```ts
const urls = buildTree({
  api: {
    p: {
      add: 0,
      remove: null,
    },
  },
});

// `urls` will be like:
/**
{
  api: {
    p: {
      newComment: '/api/p/add',
      newPost: '/api/p/remove',
    },
  },
}
*/
```

To replace underscores with hyphens, use `Option.underscoresToHyphens`:

```ts
const urls = buildTree(
  {
    api: {
      p: {
        add_user: 'add_user',
        // Falsy values are automatically filled with key names.
        remove_user: 0,
      },
    },
  },
  { underscoresToHyphens: true },
);

// `urls` will be like:
/**
{
  api: {
    p: {
      add_user: '/api/p/add_user',
      remove_user: '/api/p/remove_user',
    },
  },
}
*/
```
