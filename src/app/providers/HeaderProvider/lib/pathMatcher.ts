export const isPathMatchingPattern = (pattern: string, path: string): boolean => {
  if (pattern === path) {
    return true;
  }

  if (pattern.endsWith('*') && path.startsWith(pattern.slice(0, -1))) {
    return true;
  }

  if (pattern.includes(':')) {
    const regexPattern = `^${pattern.replace(/:\w+/g, '([^/]+)')}$`;

    return new RegExp(regexPattern).test(path);
  }

  return false;
};
