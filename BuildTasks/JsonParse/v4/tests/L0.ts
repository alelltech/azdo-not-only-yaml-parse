import { join as joinPath} from 'node:path';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { setIn } from '../../../Common/v4/ParamsUtil';
import { EXT } from '../../../Common/v4/RuntimeUtil';
import { mockJsonContent, mockQueries } from './L0.mock'
import { _loadData } from 'azure-pipelines-task-lib/internal'

setIn({
  queries: mockQueries,
  source: mockJsonContent,
  sourceType: 'text'
})

_loadData();

let taskPath = joinPath(__dirname, '..', `JsonParse.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.run();
