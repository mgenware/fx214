const contentAttr = '__content__';

function isObject(val: unknown): boolean {
  return typeof val === 'object' && val !== null;
}

function buildTreeCore(tree: Record<string, unknown>, prefix: string): Record<string, unknown> {
  if (!isObject(tree)) {
    return tree;
  }
  const res: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(tree)) {
    if (isObject(val)) {
      const valAsObj = val as Record<string, unknown>;
      res[key] = buildTreeCore(valAsObj, `${prefix}/${valAsObj[contentAttr] ?? key}`);
    } else if (key !== contentAttr && typeof val !== 'function') {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      res[key] = `${prefix}/${val || key}`;
    } else {
      res[key] = val;
    }
  }
  return res;
}

export default function buildTree<T extends Record<string, unknown>>(tree: T): T {
  return buildTreeCore(tree, '') as T;
}
