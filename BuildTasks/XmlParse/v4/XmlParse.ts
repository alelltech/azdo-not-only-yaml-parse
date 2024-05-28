import {
  TaskResult,
  getInput,
  setResult
} from 'azure-pipelines-task-lib/task';
import { runScript } from '../../Common/v4/ScriptRunner';
import { parseScriptInput } from '../../Common/v4/ScriptRunnerInput';
import * as XML from 'xml-js';
import { SourceType } from '@alell/azure-pipelines-task-commons'

interface PipesFnMap {
  upper(value?: string): string
  lower(value?: string): string
  stripNs(value?: string): string
  trim(value?: string): string
  trimStart(value?: string): string
  trimEnd(value?: string): string
}


const pipesFnHandle = {
  upper: (value?: string) => (value ?? '').toUpperCase(),
  lower: (value?: string) => (value ?? '').toLowerCase(),
  stripNs: (value?: string) => (value ?? '').replace(/^[^:]+:/g,''),
  trim: (value?: string) => (value ?? '').trim(),
  trimStart: (value?: string) => (value ?? '').trimStart(),
  trimEnd: (value?: string) => (value ?? '').trimEnd(),
}

function pipesProcessor(pipes?: Array<keyof PipesFnMap>){
  if(!pipes || pipes.length === 0) return (v: string) => v

  return (value: string) => {
    let r = value;
    for (const pipeName of pipes) {
      r = pipesFnHandle[pipeName](value)
    }
    return r
  }
}

function parsePipe(rawPipes: string): Array<keyof PipesFnMap> {
  if(!(rawPipes ?? '').trim()) return [];
  return (rawPipes).split('|').map(p => p.trim()) as Array<keyof PipesFnMap>;
}

async function run() {
  try {

    const source = getInput('source', true);
    const sourceType: SourceType = getInput('sourceType', true) as any;
    const inQueries = getInput('queries', true);

    const pipeDoctype = parsePipe(getInput('doctype'));
    const pipeInstruction = parsePipe(getInput('instruction'));
    const pipeCdata = parsePipe(getInput('cdata'));
    const pipeComment = parsePipe(getInput('comment'));
    const pipeText = parsePipe(getInput('text'));
    const pipeInstructionName = parsePipe(getInput('instructionName'));
    const pipeElementName = parsePipe(getInput('elementName'));
    const pipeAttributeName = parsePipe(getInput('attributeName'));
    const pipeAttributeValue = parsePipe(getInput('attributeValue'));
    const pipeAttributes = parsePipe(getInput('attributes'));


    const { parsedContent, queries } = await parseScriptInput({
      source,
      sourceType,
      queries: inQueries,
      fnToJson: (content) => {
        return [
          XML.xml2js(content, {
            compact: true,
            doctypeFn: pipesProcessor(pipeDoctype),
            instructionFn: pipesProcessor(pipeInstruction),
            cdataFn: pipesProcessor(pipeCdata),
            commentFn: pipesProcessor(pipeComment),
            textFn: pipesProcessor(pipeText),
            instructionNameFn: pipesProcessor(pipeInstructionName),
            elementNameFn: pipesProcessor(pipeElementName),
            attributeNameFn: pipesProcessor(pipeAttributeName),
            attributeValueFn: pipesProcessor(pipeAttributeValue),
            attributesFn: pipesProcessor(pipeAttributes),
          })
        ];
      }
    });

    runScript(queries, parsedContent);

  }
  catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
