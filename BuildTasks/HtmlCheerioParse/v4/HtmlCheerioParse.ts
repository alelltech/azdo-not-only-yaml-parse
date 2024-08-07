import { TaskResult, getInput, setResult } from "azure-pipelines-task-lib/task";
import {
  parseScriptInput,
  executeScript,
} from "@alell/azure-pipelines-task-jsonpath-plus";
import {
  GetProtocols,
  SourceType,
  get,
  set,
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

    // TODO: will be used on annother task
    // const htmlFields = inputsToJson($);

    const parsedQueries = parse(inQueries);

    execute(parsedQueries, async (_script, { kind, query, target, pipes }) => {
      const pipesMap: Record<string, (node: cheerio.AnyNode | any) => any> = {
        val: (current) => {
          if (current.val) return current.val();
        },
        serialize: (current) => {
          if (current.serialize) return current.serialize();
        },
        first: (current) => {
          if (current.first) return current.first();
        },
        next: (current) => {
          if (current.next) return current.next();
        },
        prev: (current) => {
          if (current.prev) return current.prev();
        },
        last: (current) => {
          if (current.last) return current.last();
        },
        parent: (current) => {
          if (current.parent) return current.parent();
        },
        html: (current) => {
          if (current.html) return current.html();
        },
        contents: (current) => {
          if (current.contents) return current.contents();
        },
        text: (current) => {
          if (current.text) return current.text();
        },
      };
      let cursor = $(query);
      for (const pipe of pipes) {
        cursor = pipesMap[pipe](cursor);
      }
      return cursor.toString();
      // set(`${kind}://${target}`, cursor.toString());

      // // in: <form><input name="foo" value="bar" /></form>
      // // input[name="foo"] | val
      // // => 'bar'
      // $(query).val();

      // // in: <form><input name="foo" value="bar" /></form>
      // // form | serialize
      // // => foo=bar
      // $(query).serialize();

      // // in: <form><input name="fooprev" value="bar prev" /><input name="foo" value="bar" /></form>
      // // input[name="foo"] | prev | val
      // // => 'bar prev'
      // $(query).first();
      // $(query).next();
      // $(query).prev();
      // $(query).last();
      // $(query).parent();
      // // $(query).parents();

      // // in: <form><input name="foo" value="bar" /></form>
      // // input[name="foo"] | html
      // // => '<input name="foo" value="bar" />'
      // $(query).html();

      // // in: <form><input name="foo" value="bar" /></form>
      // // form | contents | html
      // // => '<input name="foo" value="bar" />'
      // $(query).contents();

      // // $(query).css();

      // // in: <ul><li>foo</li><li>bar</li></ul>
      // // li | text
      // // => 'foo\nbar'
      // $(query).text();
    });
  } catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
