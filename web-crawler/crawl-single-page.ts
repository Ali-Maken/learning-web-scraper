import { validateWebsiteResponse } from "./crawl-helper/crawl-helpers";

export async function crawlSinglePageAndPrintHtml(baseUrl: string) {
  console.log("Actively Crawling", baseUrl);
  try {
    const website = await fetch(baseUrl);
    const vResp = validateWebsiteResponse(website, baseUrl);

    if (!vResp) return;

    const websiteHtml = await website.text();
    console.log(websiteHtml);
  } catch (err: any) {
    console.log(`error in fetch: ${err.message}`);
  }
}
