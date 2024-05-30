import { join as joinPath} from 'node:path';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { setIn, EXT } from '@alell/azure-pipelines-task-commons';
import { mockYamlContent, mockYamlQueries } from './L0.yaml.mock'
import { _loadData } from 'azure-pipelines-task-lib/internal';

setIn({
  queries: mockYamlQueries,
  source: mockYamlContent,
  sourceType: 'text'
})

_loadData()

let taskPath = joinPath(__dirname, '..', `YamlParse.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);


runner.run();
