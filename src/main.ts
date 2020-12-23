const contentAttr = '__content__';

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
      res[key] = buildTreeCore(
        val,
        `${prefix}/${(val as Record<string, unknown>)[contentAttr] ?? key}`,
      );
    } else if (typeof val === 'string' && key !== contentAttr) {
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
