import { JSDOM } from "jsdom";

export function getUrlsFromHtml(htmlBody: string, urlPath: string): any[] {
  const urls: string[] = [];
  const domObj = new JSDOM(htmlBody);

  const linkElements = domObj.window.document.querySelectorAll("a");

  Array.from(linkElements).forEach((link) => {
    if (link.href.slice(0, 1) == "/") {
      /* RELATIVE */
      try {
        const urlObj = new URL(`${urlPath}${link.href}`);
        urls.push(urlObj.href);
      } catch (err: any) {
        console.log("Error : ", err.message);
      }
    } else {
      /* ABSOLUTE */
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err: any) {
        console.log("Error : ", err.message);
      }
    }
  });

  return urls;
}

export function normalizeUrl(urlString: string): string {
  /*
  Removes the http, https, and capitalization.
  Essentially, Normalizes the given URL.
  */

  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  /* For Any Trailing Slashes in Path */
  if (hostPath.length > 0 && hostPath.slice(-1) == "/") {
    return hostPath.slice(0, -1);
  }

  return hostPath;
}
