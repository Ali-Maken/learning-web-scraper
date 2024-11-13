import { crawlWebsite } from "./web-crawlers/crawl";

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
  
  */
  const baseUrl = process.argv[2];

  console.log("Starting crawl for", baseUrl);

  await crawlWebsite(baseUrl);
}

main();
