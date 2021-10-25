const contentAttr = '__content__';

export interface Options {
  // Replace underscores with hyphens.
  underscoresToHyphens?: boolean;
}

function isObject(val: unknown): boolean {
  return typeof val === 'object' && val !== null;
}

function buildTreeCore(
  tree: Record<string, unknown>,
  prefix: string,
  opt: Options,
): Record<string, unknown> {
  if (!isObject(tree)) {
    return tree;
  }
  const res: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(tree)) {
    if (isObject(val)) {
      const valAsObj = val as Record<string, unknown>;
      res[key] = buildTreeCore(valAsObj, `${prefix}/${valAsObj[contentAttr] ?? key}`, opt);
    } else if (key !== contentAttr && typeof val !== 'function') {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const converted = `${prefix}/${val || key}`;
      res[key] = opt.underscoresToHyphens ? converted.replace(/_/g, '-') : converted;
    } else {
      res[key] = val;
    }
  }
  return res;
}

export default function buildTree<T extends Record<string, unknown>>(tree: T, opt?: Options): T {
  return buildTreeCore(tree, '', opt ?? {}) as T;
}
