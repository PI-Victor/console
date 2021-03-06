import { TFunction } from 'i18next';
import { taskRunSnippetMessage } from '../log-snippet-utils';
import { ErrorDetailsWithLogName, ErrorDetailsWithStaticLog } from '../log-snippet-types';
import { LogSnippetTaskData } from './log-snippet-test-data';

const testContainer = 'container-B';
const t = (key: TFunction) => key;

describe('LogSnippet utils test', () => {
  it('should return title and static message for no container', () => {
    const { title, staticMessage } = taskRunSnippetMessage(
      LogSnippetTaskData[0].metadata.name,
      LogSnippetTaskData[0].status,
      null,
      t,
    ) as ErrorDetailsWithStaticLog;
    expect(title).toEqual(
      'pipelines-plugin~Failure on task {{taskName}} - check logs for details.',
    );
    expect(staticMessage).toEqual('pipelines-plugin~Unknown failure condition');
  });

  it('should return title and static message for no pod', () => {
    const { title, staticMessage } = taskRunSnippetMessage(
      LogSnippetTaskData[0].metadata.name,
      LogSnippetTaskData[0].status,
      testContainer,
      t,
    ) as ErrorDetailsWithStaticLog;
    expect(title).toEqual(
      'pipelines-plugin~Failure on task {{taskName}} - check logs for details.',
    );
    expect(staticMessage).toEqual('pipelines-plugin~Unknown failure condition');
  });

  it('should return title from task metadata, pod and container', () => {
    const { title, podName, containerName } = taskRunSnippetMessage(
      LogSnippetTaskData[1].metadata.name,
      LogSnippetTaskData[1].status,
      testContainer,
      t,
    ) as ErrorDetailsWithLogName;
    expect(title).toEqual(
      'pipelines-plugin~Failure on task {{taskName}} - check logs for details.',
    );
    expect(podName).toEqual(LogSnippetTaskData[1].status.podName);
    expect(containerName).toEqual(testContainer);
  });
});
