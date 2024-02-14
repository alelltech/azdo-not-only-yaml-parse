import {
  TaskResult,
  getInput,
  setResult
} from 'azure-pipelines-task-lib/task';
import { runScript } from '../../Common/v4/ScriptRunner';
import { SourceType, parseScriptInput } from '../../Common/v4/ScriptRunnerInput';
import * as YAML from 'js-yaml'


async function run() {
  try {

    const source = getInput('source', true);
    const sourceType: SourceType = getInput('sourceType', true) as any;
    const inQueries = getInput('queries', true);

    const { parsedContent, queries } = parseScriptInput({
      source,
      sourceType,
      queries: inQueries,
      fnToJson: YAML.loadAll
    });

    runScript(queries, parsedContent);

  }
  catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
