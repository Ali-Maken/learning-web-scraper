import { JSDOM } from "jsdom";

export function normalizeUrl(urlString: string): string {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  /* For Any Trailing Slashes in Path */
  if (hostPath.length > 0 && hostPath.slice(-1) == "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

export function getUrlsFromHtml(htmlBody: string, urlPath: string): any[] {
  const urls: string[] = [];
  const domObj = new JSDOM(htmlBody);

  const linkElements = domObj.window.document.querySelectorAll("a");

  for (const link of Array.from(linkElements)) {
    let returnUrlPath: string;
    try {
      if (link.href.slice(0, 1) == "/") {
        returnUrlPath = `${urlPath}${link.href}`;
      } else {
        returnUrlPath = link.href;
      }

      const urlObj = new URL(returnUrlPath);
      urls.push(urlObj.href);
    } catch (err: any) {
      console.log("Error : ", err.message);
    }
  }

  return urls;
}

export function validateWebsiteResponse(websiteResp: Response, url: string) {
  // Wrong path
  if (websiteResp.status > 399) {
    console.log(
      `error in fetch with status coode ${websiteResp.status} on page ${url}`
    );
    return false;
  }
  // Non HTML headers
  const websiteHeader = websiteResp.headers.get("content-type");
  if (!websiteHeader?.includes("text/html")) {
    console.log(`non html response, content: ${websiteHeader}, on page ${url}`);
    return false;
  }
  return true;
}
