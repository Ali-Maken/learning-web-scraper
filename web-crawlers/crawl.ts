import { JSDOM } from "jsdom";

export async function crawlWebsite(baseUrl: string) {
  console.log("Actively Crawling", baseUrl);

  const websiteData = await fetch(baseUrl);

  const websiteHtml = await websiteData.text();

  console.log(websiteHtml);
}

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
      } catch (err) {
        console.log("Error : ", err);
      }
    } else {
      /* ABSOLUTE */
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log("Error : ", err);
      }
    }
  });

  return urls;
}

export function normalizeUrl(urlString: string): string {
  const urlObj = new URL(urlString);

  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  /* For Any Trailing Slashes in Path */
  if (hostPath.length > 0 && hostPath.slice(-1) == "/") {
    return hostPath.slice(0, -1);
  }

  return hostPath;
}
