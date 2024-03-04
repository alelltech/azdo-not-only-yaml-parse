import { join as joinPath} from 'node:path';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { setIn } from '../../../Common/v4/ParamsUtil';
import { EXT } from '../../../Common/v4/RuntimeUtil';
import { mockJsonContent, mockQueries } from './L0.mock'
import { _loadData } from 'azure-pipelines-task-lib/internal'
import { setVariable } from 'azure-pipelines-task-lib';

setIn({
  queries: mockQueries,
  source: mockJsonContent,
  sourceType: 'text'
})
setVariable("PORT", "5500");

_loadData();

let taskPath = joinPath(__dirname, '..', `PropertiesParse.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.run();
