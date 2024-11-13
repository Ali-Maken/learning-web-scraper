import { crawlSinglePage } from "./web-crawlers/crawl-single-page";
import { crawlPage } from "./web-crawlers/crawl-webiste";

async function main() {
  if (process.argv.length < 3) {
    console.log("Not Enough command line args");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("Too many command line args");
    process.exit(1);
  }

  /*
  Example Url can be the blog website of the course teacher i.e.
  
  WagsLane - BootDev
  https://wagslane.dev

  For wrong path check:
  https://wagslane.dev/garbagePath

  For wrong response type check i.e. non html headers:
  https://wagslane.dev/sitemap.xml
  
  */
  const baseUrl = process.argv[2];

  console.log("Starting crawl for", baseUrl);

  const pages = await crawlPage(baseUrl, baseUrl, {});

  for (const page of Object.entries(pages)) {
    console.log(page);
  }

  // await crawlSinglePage(baseUrl);
}

main();
