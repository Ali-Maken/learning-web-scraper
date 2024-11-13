export function printCrawlReport(pages: {}) {
  console.log("==================");
  console.log("------REPORT------");
  console.log("==================");

  const sortedPages = sortPages(pages);

  for (const page of sortedPages) {
    console.log(`Found ${page[1]} hits for link ${page[0]}.`);
  }
  console.log("===================");
  console.log("--------End--------");
  console.log("===================");
}

export function sortPages(pages: {}) {
  const pagesArr = Object.entries(pages);

  pagesArr.sort((a: any[], b: any[]) => {
    const aHit = a[1];
    const bHit = b[1];
    return bHit - aHit;
  });

  return pagesArr;
}
