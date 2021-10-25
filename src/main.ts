const contentAttr = '__content__';

export interface Options {
  // Replace underscores with hyphens.
  underscoresToHyphens?: boolean;
}

function isObject(val: unknown): boolean {
  return typeof val === 'object' && val !== null;
}

function handlePathComponent(s: string, underscoresToHyphens: boolean | undefined): string {
  if (underscoresToHyphens) {
    return s.replace(/_/g, '-');
  }
  return s;
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
      res[key] = buildTreeCore(
        valAsObj,
        `${prefix}/${valAsObj[contentAttr] ?? handlePathComponent(key, opt.underscoresToHyphens)}`,
        opt,
      );
    } else if (key !== contentAttr && typeof val !== 'function') {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      res[key] = `${prefix}/${handlePathComponent(`${val || key}`, opt.underscoresToHyphens)}`;
    } else {
      res[key] = val;
    }
  }
  return res;
}

export default function buildTree<T extends Record<string, unknown>>(tree: T, opt?: Options): T {
  return buildTreeCore(tree, '', opt ?? {}) as T;
}
