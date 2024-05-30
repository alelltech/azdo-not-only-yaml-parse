import {
  TaskResult,
  getInput,
  setResult
} from 'azure-pipelines-task-lib/task';
import { parseScriptInput, executeScript } from '@alell/azure-pipelines-task-jsonpath-plus';
import * as YAML from 'js-yaml'
import { SourceType } from '@alell/azure-pipelines-task-commons'
import { isCommon as _isCommon } from '../../Common/v4/Common';

async function run() {
  try {

    const source = getInput('source', true);
    const sourceType: SourceType = getInput('sourceType', true) as any;
    const inQueries = getInput('queries', true);

    const { parsedContent, queries } = await parseScriptInput({
      source,
      sourceType,
      queries: inQueries,
      fnToJson: YAML.loadAll
    });

    executeScript(queries, parsedContent);

  }
  catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
