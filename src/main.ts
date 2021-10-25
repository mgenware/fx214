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
    } else if (typeof val === 'string' && key !== contentAttr) {
      res[key] = `${prefix}/${val}`;
    } else {
      res[key] = val;
    }
  }
  return res;
}

export default function buildTree(tree: Record<string, unknown>): Record<string, unknown> {
  return buildTreeCore(tree, '');
}
