import { readFileSync } from "node:fs";
import { join as joinPath } from "node:path";

export const mockHtmlContent = (() => {
  try {
    return readFileSync(
      joinPath(__dirname, "mocks", "L0.sourceContent.html")
    ).toString("utf-8");
  } catch (error) {
    console.error(error);
  }
})();

export const mockHtmlQueries = [
  `var div_text = .container-xl .d-inline-flex | next | text`,
].join("\n");
