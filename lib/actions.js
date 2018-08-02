'use babel'
/* @flow */
/* global atom */

import type { OpenFilePayload, OpenWorkspacePayload } from './types'

/**
 * Opens a file in the current workspace.
 *
 *     openFile({ paths: ['/etc/passwd'] })
 *     openFile({ paths: ['/etc/passwd'], new: '1' })
 */

export const openFile = (payload: OpenFilePayload) => {
  // TODO Validate payload.paths
  if (payload.new) {
    atom.open({
      pathsToOpen: payload.paths,
      newWindow: true
    })
  } else {
    payload.paths.forEach((filepath: string) => {
      atom.workspace.open(filepath)
    })
    focusWindow()
  }
}

export const openWorkspace = (payload: OpenWorkspacePayload) => {
  if (payload.new) {
  } else {
    // TODO Validate payload.paths
    atom.project.setPaths(payload.paths)
    atom.workspace.getPanes().forEach(pane => pane.destroy())
    focusWindow()
  }
}

/**
 * Default action
 */

export const notFound = (_command: string, _payload: any) => {
  const err = new Error('unknown command')
  throw err
}

/**
 * Focus the current window.
 */

export const focusWindow = () => {
  const { remote } = require('electron')
  const win = remote.getCurrentWindow()
  if (win) win.focus()
}
