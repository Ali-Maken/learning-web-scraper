// crawl.test.ts
import { getUrlsFromHtml, normalizeUrl } from "./crawl-helpers";
import { test, expect } from "@jest/globals";

/*
https://boot.dev  -> boot.dev
http://boot.dev   -> boot.dev
https://Boot.dev  -> boot.dev

*/

test("normalize strip protocal", () => {
  const input = "https://boot.dev/path";
  const output = normalizeUrl(input);
  const expected = "boot.dev/path";

  expect(output).toEqual(expected);
});

test("normalize strip trailing slashes", () => {
  const input = "https://boot.dev/path/";
  const output = normalizeUrl(input);
  const expected = "boot.dev/path";

  expect(output).toEqual(expected);
});

test("normalize strip capitals", () => {
  const input = "https://BOOT.dev/path/";
  const output = normalizeUrl(input);
  const expected = "boot.dev/path";

  expect(output).toEqual(expected);
});

test("normalize strip http", () => {
  const input = "http://BOOT.dev/path/";
  const output = normalizeUrl(input);
  const expected = "boot.dev/path";

  expect(output).toEqual(expected);
});

test("getUrlsFromHtml absolute path", () => {
  const inputHtml = `
  <html>
    <body>
      <a href="https://blog.boot.dev/path">
        Boot.dev Example Html Body
      </a>
    </body>
  </html>
  `;
  const inputUrl = "https://blog.boot.dev/path";
  const output = getUrlsFromHtml(inputHtml, inputUrl);
  const expected = ["https://blog.boot.dev/path"];

  expect(output).toEqual(expected);
});

test("getUrlsFromHtml relative path", () => {
  const inputHtml = `
  <html>
    <body>
      <a href="/path">
        Boot.dev Example Html Body
      </a>
    </body>
  </html>
  `;
  const inputUrl = "https://blog.boot.dev";
  const output = getUrlsFromHtml(inputHtml, inputUrl);
  const expected = ["https://blog.boot.dev/path"];

  expect(output).toEqual(expected);
});

test("getUrlsFromHtml multiple paths absolute", () => {
  const inputHtml = `
  <html>
    <body>
      <a href="https://blog.boot.dev/path1">
        Boot.dev Example One Html Body
      </a>

      <a href="https://blog.boot.dev/path2">
        Boot.dev Example Two Html Body
      </a>
    </body>
  </html>
  `;
  const inputUrl = "https://blog.boot.dev";
  const output = getUrlsFromHtml(inputHtml, inputUrl);
  const expected = [
    "https://blog.boot.dev/path1",
    "https://blog.boot.dev/path2",
  ];

  expect(output).toEqual(expected);
});

test("getUrlsFromHtml multiple paths relative", () => {
  const inputHtml = `
  <html>
    <body>
      <a href="/path1">
        Boot.dev Example One Html Body
      </a>

      <a href="/path2">
        Boot.dev Example Two Html Body
      </a>
    </body>
  </html>
  `;
  const inputUrl = "https://blog.boot.dev";
  const output = getUrlsFromHtml(inputHtml, inputUrl);
  const expected = [
    "https://blog.boot.dev/path1",
    "https://blog.boot.dev/path2",
  ];

  expect(output).toEqual(expected);
});

test("getUrlsFromHtml multiple paths absolute relative", () => {
  const inputHtml = `
  <html>
    <body>
      <a href="https://blog.boot.dev/path1">
        Boot.dev Example One Html Body
      </a>

      <a href="/path2">
        Boot.dev Example Two Html Body
      </a>
    </body>
  </html>
  `;
  const inputUrl = "https://blog.boot.dev";
  const output = getUrlsFromHtml(inputHtml, inputUrl);
  const expected = [
    "https://blog.boot.dev/path1",
    "https://blog.boot.dev/path2",
  ];

  expect(output).toEqual(expected);
});

test("getUrlsFromHtml invalid url", () => {
  const inputHtml = `
  <html>
    <body>
      <a href="invalid path">
        Boot.dev Example Two Html Body
      </a>
    </body>
  </html>
  `;
  const inputUrl = "https://blog.boot.dev";
  const output = getUrlsFromHtml(inputHtml, inputUrl);
  const expected: any = [];

  expect(output).toEqual(expected);
});
