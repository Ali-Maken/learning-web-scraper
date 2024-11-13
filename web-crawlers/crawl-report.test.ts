import { test, expect } from "@jest/globals";
import { sortPages } from "./crawl-report";

test("crawl sort pages", () => {
  const input = {
    "https://boot.dev/path/path2": 8,
    "https://boot.dev/path/path1": 3,
    "https://boot.dev/path/path3": 19,
    "https://boot.dev/path/path4": 1,
  };
  const output = sortPages(input);

  const expected = [
    ["https://boot.dev/path/path3", 19],
    ["https://boot.dev/path/path2", 8],
    ["https://boot.dev/path/path1", 3],
    ["https://boot.dev/path/path4", 1],
  ];

  expect(output).toEqual(expected);
});
