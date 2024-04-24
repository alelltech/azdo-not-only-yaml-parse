import { join as joinPath} from 'node:path';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { setIn } from '../../../Common/v4/ParamsUtil';
import { EXT } from '../../../Common/v4/RuntimeUtil';
import { _loadData } from 'azure-pipelines-task-lib/internal'

import { readFileSync } from 'node:fs';

export const mockJsonContent = (() => {
  try {
    return readFileSync(joinPath(__dirname, 'mocks', 'L0.sourceContent.json')).toString('utf-8');
  } catch (error) {
    console.error(error);
  }
}
)()

export const mockQueries = [
  `var NAME    =      .metadata.name | downcase`,
  `var KIND    =    .kind`,
  `out DOC_THREE_NAME    =      .metadata.name | downcase`,
  `echo      .kind | uppercase`,
  `file  ./bar/annotations.json  = .metadata.annotations`,
  `echo      .emptyResultTest | uppercase`,
  `var DOC_TWO_NAME    =      $[1].metadata.name | downcase`,

].join('\n')

setIn({
  queries: mockQueries,
  source: mockJsonContent,
  sourceType: 'text'
})

_loadData();

let taskPath = joinPath(__dirname, '..', `JsonParse.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.run();
