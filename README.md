# fx214

Hierarchical URL constants in less code.

## Installation

```sh
yarn add fx214
```

## Usage

```ts
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

Note that type info is not lost after calling `buildTree`, you can continue using something like `urls.api.private.newPost` to access an individual item.
