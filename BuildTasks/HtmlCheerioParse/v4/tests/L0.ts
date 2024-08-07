import { join as joinPath } from "node:path";
import { TaskMockRunner } from "azure-pipelines-task-lib/mock-run";
import { setIn, EXT } from "@alell/azure-pipelines-task-commons";
import { mockHtmlContent, mockHtmlQueries } from "./L0.html.mock";
import { _loadData } from "azure-pipelines-task-lib/internal";

setIn({
  queries: mockHtmlQueries,
  source: mockHtmlContent,
  sourceType: "text",
});

_loadData();

let taskPath = joinPath(__dirname, "..", `HtmlCheerioParse.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.run();
