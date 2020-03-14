function isObject(val: unknown): boolean {
  return typeof val === 'object' && val !== null;
}

function buildTreeCore(tree: unknown, prefix: string): unknown {
  if (!isObject(tree)) {
    return tree;
  }
  const res: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(tree as Record<string, unknown>)) {
    if (isObject(val)) {
      res[key] = buildTreeCore(val, `${prefix}/${key}`);
    } else if (typeof val === 'string') {
      res[key] = `${prefix}/${val}`;
    } else {
      res[key] = val;
    }
  }
  return res;
}

export default function buildTree<T>(tree: T): T {
  return buildTreeCore(tree, '') as T;
}
