# get-git-channel-slack-msg-id-by-branch-name



# Get slack message by channel

This action queries a given slack channel for the most recent non-reply message returned using `CICD Alerts for ${github.context.ref}` as the predicate.

## Inputs

### `Channel`

**Required** The channel to limit this search to.

### `Token`

**Required** The Slack Auth Token.

## Outputs

### `messageId`

The Unique Identifier utilized as message UUID by `voxmedia/github-action-slack-notify-build@v1` 

## Example usage

uses: actions/get-git-channel-slack-msg-id-by-branch-name@v1.1
with:
  Channel: ${{secrets.GIT_NOTIFICATION_CHANNEL}}
  Token: ${{secrets.SLACK_BOT_TOKEN}}