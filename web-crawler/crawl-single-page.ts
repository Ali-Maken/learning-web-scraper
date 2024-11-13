export async function crawlSinglePageAndPrintHtml(baseUrl: string) {
  console.log("Actively Crawling", baseUrl);
  try {
    const website = await fetch(baseUrl);
    // Good Website, wrong path
    if (website.status > 399) {
      console.log(
        `error in fetch with status coode ${website.status} on page ${baseUrl}`
      );
      return;
    }
    // Good Website, wrong headers
    const websiteHeader = website.headers.get("content-type");
    if (!websiteHeader?.includes("text/html")) {
      console.log(
        `non html response, content: ${websiteHeader}, on page ${baseUrl}`
      );
      return;
    }

    const websiteHtml = await website.text();
    console.log(websiteHtml);
  } catch (err: any) {
    console.log(`error in fetch: ${err.message}`);
  }
}
