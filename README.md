# Web Scraping Learning Project

This repository contains a simple web scraper built for learning purposes. The project was inspired by Boot.dev's video series, and the main goal is to practice the fundamentals of web scraping by crawling websites and extracting their links and HTML content.

## Overview

The web scraper is capable of crawling any website, printing out all the links, and displaying the HTML body of the pages it encounters.

### Key Files

The main files for the project are located in the `web-crawler` folder. These files include:

- **`crawl-single-page.ts`**: A basic scraper that fetches and prints the HTML body of a single page. This file serves as a starting point for understanding how web scraping works.
- **`crawl-report.ts`**: The main logic for recursively scraping an entire website. This file crawls all pages on the site, extracts links, and processes the site structure recursively.

- **`RUN`** **`npm start https://wagslane.dev`** in terminal to run a basic demo.

#### Testing with Jest

- The project uses Jest for unit testing.
- Jest looks for test files that end with .test.ts or .test.js.
- To run the tests, use the following command:

```bash
    npm test
```

---

### Notes for Myself

#### Test-Driven Development (TDD)

In TDD, there are three main steps:

- Stub out the main function: Create a basic structure for the function.
- Write the test: Implement the test case for the function.
- Implement the function: Write the code for the function, ensuring it passes the test.
