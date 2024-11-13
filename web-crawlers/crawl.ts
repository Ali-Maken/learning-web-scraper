import { JSDOM } from "jsdom";

export async function crawlWebsite(baseUrl: string) {
  console.log("Actively Crawling", baseUrl);

  try {
    const website = await fetch(baseUrl);
    if (notValidate(website, baseUrl)) return;

    const websiteHtml = await website.text();
    console.log(websiteHtml);
  } catch (err: any) {
    console.log(`error in fetch: ${err.message}`);
  }
}

function notValidate(website: Response, baseUrl: string): boolean {
  // Good Website, wrong path
  if (website.status > 399) {
    console.log(
      `error in fetch with status coode ${website.status} on page ${baseUrl}`
    );
    return true;
  }

  // Good Website, wrong headers
  const websiteHeader = website.headers.get("content-type");
  if (!websiteHeader?.includes("text/html")) {
    console.log(
      `non html response, content: ${websiteHeader}, on page ${baseUrl}`
    );
    return true;
  }
  return false;
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
