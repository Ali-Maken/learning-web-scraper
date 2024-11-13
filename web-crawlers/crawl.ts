// crawl.ts
export function normalizeUrl(urlString: string): string {
  const urlObj = new URL(urlString);

  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  /* For Any Trailing Slashes in Path */
  if (hostPath.length > 0 && hostPath.slice(-1) == "/") {
    return hostPath.slice(0, -1);
  }

  return hostPath;
}
