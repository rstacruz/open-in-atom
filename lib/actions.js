'use babel'
/* @flow */
/* global atom */

import type { OpenFilePayload } from './types'

/**
 * Opens a file in the current workspace.
 *
 *     openFile({ paths: ['/etc/passwd'] })
 *     openFile({ paths: ['/etc/passwd'], new: '1' })
 */

export const openFile = (payload: OpenFilePayload) => {
  if (payload.new) {
    console.log('[Actions.open]: opening in new window')
    atom.open({
      pathsToOpen: payload.paths,
      newWindow: true
    })
  } else {
    console.log('[Actions.open]: opening in same window')
    payload.paths.forEach((filepath: string) => {
      atom.workspace.open(filepath)
    })
  }
}

/**
 * Default action
 */

export const notFound = (_command, _payload) => {
  const err = new Error('unknown command')
  throw err
}
