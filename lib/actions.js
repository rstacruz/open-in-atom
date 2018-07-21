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
  }
}

export const openWorkspace = (payload: OpenWorkspacePayload) => {
  if (payload.new) {
  } else {
    // TODO Validate payload.paths
    atom.project.setPaths(payload.paths)
    atom.workspace.getTextEditors().forEach(editor => {
      if (!editor.isModified()) {
        editor.destroy()
      }
    })
  }
}
/**
 * Default action
 */

export const notFound = (_command: string, _payload: any) => {
  const err = new Error('unknown command')
  throw err
}
