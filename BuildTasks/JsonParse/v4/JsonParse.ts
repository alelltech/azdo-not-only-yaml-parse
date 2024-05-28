import {
  TaskResult,
  getInput,
  setResult
} from 'azure-pipelines-task-lib/task';
import { runScript } from '../../Common/v4/ScriptRunner';
import { parseScriptInput } from '../../Common/v4/ScriptRunnerInput';
import { SourceType } from '@alell/azure-pipelines-task-commons'

async function run() {
  try {

    const source = getInput('source', true);
    const sourceType: SourceType = getInput('sourceType', true) as any;
    const inQueries = getInput('queries', true);

    const { parsedContent, queries } = await parseScriptInput({
      source,
      sourceType,
      queries: inQueries,
      fnToJson: JSON.parse
    });

    runScript(queries, parsedContent);

  }
  catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
