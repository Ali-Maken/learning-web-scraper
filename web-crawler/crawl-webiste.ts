import {
  getUrlsFromHtml,
  normalizeUrl,
  validateWebsiteResponse,
} from "./crawl-helper/crawl-helpers";

export async function webCrawlPages(
  baseUrl: string,
  currentUrl: string,
  pages: { [key: string]: number }
) {
  const currUrlObj = new URL(currentUrl);
  const baseUrlObj = new URL(baseUrl);

  if (baseUrlObj.hostname != currUrlObj.hostname) return pages;

  const normalizedCurrentUrl = normalizeUrl(currentUrl);

  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }

  pages[normalizedCurrentUrl] = 1;
  console.log("Actively Crawling", currentUrl);

  try {
    const website = await fetch(currentUrl);
    const validResponse = validateWebsiteResponse(website, currentUrl);

    if (!validResponse) return pages;

    const websiteHtml = await website.text();
    const nextURLs = getUrlsFromHtml(websiteHtml, baseUrl);

    for (const nextURL of nextURLs) {
      pages = await webCrawlPages(baseUrl, nextURL, pages);
    }
  } catch (err: any) {
    console.log(`error in fetch: ${err.message}`);
  }

  return pages;
}
