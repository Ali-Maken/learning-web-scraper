import { getUrlsFromHtml, normalizeUrl } from "./crawl-helpers";

export async function crawlPage(
  baseUrl: string,
  currentUrl: string,
  pages: { [key: string]: number }
) {
  const currentUrlObj = new URL(currentUrl);
  const baseUrlObj = new URL(baseUrl);

  if (baseUrlObj.hostname != currentUrlObj.hostname) {
    return pages;
  }

  const normalizedCurrentUrl = normalizeUrl(currentUrl);

  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }

  pages[normalizedCurrentUrl] = 1;
  console.log("Actively Crawling", currentUrl);
  try {
    const website = await fetch(currentUrl);
    // Good Website, wrong path
    if (website.status > 399) {
      console.log(
        `error in fetch with status coode ${website.status} on page ${currentUrl}`
      );
      return pages;
    }
    // Good Website, wrong headers
    const websiteHeader = website.headers.get("content-type");
    if (!websiteHeader?.includes("text/html")) {
      console.log(
        `non html response, content: ${websiteHeader}, on page ${currentUrl}`
      );
      return pages;
    }

    const websiteHtml = await website.text();

    const nextURLs = getUrlsFromHtml(websiteHtml, baseUrl);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseUrl, nextURL, pages);
    }
  } catch (err: any) {
    console.log(`error in fetch: ${err.message}`);
  }

  return pages;
}
