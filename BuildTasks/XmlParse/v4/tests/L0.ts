import { join as joinPath} from 'node:path';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { setIn } from '../../../Common/v4/ParamsUtil';
import { EXT } from '../../../Common/v4/RuntimeUtil';
import { mockXmlContent, mockXmlQueries } from './L0.xml.mock'
import { _loadData } from 'azure-pipelines-task-lib/internal';

setIn({
  queries: mockXmlQueries,
  source: mockXmlContent,
  sourceType: 'text'
})

_loadData()

let taskPath = joinPath(__dirname, '..', `XmlParse.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);


runner.run();
