import { TaskResult, getInput, setResult } from "azure-pipelines-task-lib/task";
import {
  parseScriptInput,
  executeScript,
} from "@alell/azure-pipelines-task-jsonpath-plus";
import {
  GetProtocols,
  SourceType,
  get,
  parse,
  execute,
} from "@alell/azure-pipelines-task-commons";
import { isCommon as _isCommon } from "../../Common/v4/Common";
import { inputsToJson } from "../../Common/v4/CheerioUtils";
import * as cheerio from "cheerio";
import { JSONPath } from "jsonpath-plus";
import { _warning } from "azure-pipelines-task-lib/internal";

async function run() {
  try {
    const source = getInput("source", true);
    const inQueries = getInput("queries", true);
    const htmlContent = await get(source);

    const $ = cheerio.load(htmlContent);

    const htmlFields = inputsToJson($);

    const parsedQueries = parse(inQueries);

    execute(parsedQueries, (script, { kind, query, target, pipes }) => {
      if (kind.startsWith("$") || kind.endsWith("$")) return $(query).text();

      let p = query;
      if (p.startsWith(".")) p = `$${p}`;
      if (!p.startsWith("$.")) p = `$.${p}`;

      p = `$..${p.replace(/^\$\.+/g, "")}`;

      const result = JSONPath({
        flatten: true,
        autostart: true,
        json: htmlFields,
        path: p,
      });
      if (!result || result.length == 0) {
        _warning(`JSONPath '${query}' has not results!`);
        return "";
      }
      let value = result[0];
      // for (const pipe of pipes) {
      //   const fnPipe = pipesMap[pipe];
      //   if (!fnPipe) continue;
      //   value = fnPipe(value);
      // }

      return value;
    });
  } catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
