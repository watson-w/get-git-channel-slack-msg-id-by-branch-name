const core = require('@actions/core');
const github = require('@actions/github');
const { WebClient } = require('@slack/web-api');

(async () => {
  const ChannelId = core.getInput('channel');
  const Token = core.getInput('token');

  const slack = new WebClient(Token);
  
  const predicate = `CICD Alerts for ${github.context.ref}`;
  const queryObject = {
    channel: ChannelId,
    text: predicate,
  }
  const searchArgs = {
    query: JSON.stringify(queryObject),
    sort: 'timestamp',
    sortDir: 'asc'
  }
  const result = await slack.search.messages(searchArgs)
    .catch((err: any) => {
      core.debug('Slack search API threw an error:')
      core.debug(err);
      core.setFailed(`Slack search API failure.`);
    });

  const rootMessage = result?.messages?.matches[0]; 
  
  if (rootMessage) {
    core.setOutput('message_id', result.messages.matches[0].ts);
  } if (!result?.ok) {
    core.setFailed(`Error returned by slack: ${result?.error}`);
  }
  
  core.setFailed(`No slack message found in chanel: ${ChannelId} matching: ${predicate}`);
  }
)();
