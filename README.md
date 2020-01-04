# fx214

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/MEAN-Module)
[![Build Status](https://img.shields.io/travis/mgenware/fx214.svg?style=flat-square&label=Build+Status)](https://travis-ci.org/mgenware/fx214)
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

For TypeScript, type information is not lost after calling `buildTree`, you can continue to use something like `urls.api.private.newPost` with autocomplete support to access an individual item.
