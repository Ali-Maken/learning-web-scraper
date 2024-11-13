import { crawlSinglePageAndPrintHtml } from "./web-crawler/crawl-single-page";
import { printCrawlReport } from "./web-crawler/crawl-report/crawl-report";
import { crawlPage } from "./web-crawler/crawl-webiste";

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

  // RUN: npm start https://wagslane.dev

  console.log("Starting crawl for", baseUrl);

  /* For Practice, Made this First */
  // await crawlSinglePageAndPrintHtml(baseUrl);

  const pages = await crawlPage(baseUrl, baseUrl, {});

  printCrawlReport(pages);
}

main();

/*
  Example Url can be the blog website of the course teacher i.e.
  
  WagsLane - BootDev
  npm start https://wagslane.dev

  For wrong path check:
  npm start https://wagslane.dev/garbagePath

  For wrong response type check i.e. non html headers:
  npm start https://wagslane.dev/sitemap.xml
  
  */
