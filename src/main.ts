const contentAttr = '__content__';

export interface Options {
  // Replace underscores with hyphens.
  underscoresToHyphens?: boolean;
  // Use this to add a prefix to all resulting URLs.
  prefix?: string;
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
  str: string,
  opt: Options,
): Record<string, unknown> {
  if (!isObject(tree)) {
    return tree;
  }
  const prefix = opt.prefix ?? '';
  const res: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(tree)) {
    if (isObject(val)) {
      const valAsObj = val as Record<string, unknown>;
      res[key] = buildTreeCore(
        valAsObj,
        `${str}/${valAsObj[contentAttr] ?? handlePathComponent(key, opt.underscoresToHyphens)}`,
        opt,
      );
    } else if (key !== contentAttr && typeof val !== 'function') {
      res[key] = `${prefix}${str}/${handlePathComponent(
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        `${val || key}`,
        opt.underscoresToHyphens,
      )}`;
    } else {
      res[key] = val;
    }
  }
  return res;
}

export default function buildTree<T extends Record<string, unknown>>(tree: T, opt?: Options): T {
  return buildTreeCore(tree, '', opt ?? {}) as T;
}
