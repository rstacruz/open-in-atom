// @flow

/** Payload for `openFile` action */
export type OpenFilePayload = {|
  path: string,
  new?: any
|}

/** Any possible payload */
export type Payload = OpenFilePayload

/** State of the plugin, which is usually nothing */
export type State = {||}

/** An action being passed to a dispatcher */
export type Action = {|
  command: string,
  payload: Payload,
  ctx: any
|}
