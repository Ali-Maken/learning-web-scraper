import { crawlSinglePageAndPrintHtml } from "./web-crawler/crawl-single-page";
import { printCrawlReport } from "./web-crawler/crawl-report/crawl-report";
import { webCrawlPages } from "./web-crawler/crawl-webiste";

async function main() {
  if (process.argv.length < 3) {
    console.log("Not Enough command line args");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("Too many command line args");
    process.exit(1);
  }
  const baseUrl = process.argv[2];

  /*
WagsLane - BootDev
  RUN: npm start https://wagslane.dev
  
  For wrong path check:
  npm start https://wagslane.dev/garbagePath

  For wrong response type check i.e. non html headers:
  npm start https://wagslane.dev/sitemap.xml
  */

  console.log("Starting crawl for", baseUrl);
  /* For Practice:
  await crawlSinglePageAndPrintHtml(baseUrl);
  */
  const pages = await webCrawlPages(baseUrl, baseUrl, {});
  printCrawlReport(pages);
}

main();
