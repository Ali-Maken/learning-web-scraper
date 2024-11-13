// crawl.test.ts
import { normalizeUrl } from "./crawl";
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
