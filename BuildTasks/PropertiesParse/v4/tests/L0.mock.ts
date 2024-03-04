import { readFileSync } from 'node:fs';
import { join as joinPath } from 'node:path';

export const mockJsonContent = (() => {
  try {
    return readFileSync(joinPath(__dirname, 'mocks', 'L0.sourceContent.properties')).toString('utf-8');
  } catch (error) {
    console.error(error);
  }
}
)()

export const mockQueries = [
  `var SPRINT_SERVER_NAME    =      .SPRINT_SERVER_NAME`,
  `var SPRINT_SERVER_PORT    =      .SPRINT_SERVER_PORT`,

].join('\n')
