'use babel'
/* global atom */

/**
 * Opens a file in the current workspace.
 *
 *     openFile({ path: '/etc/passwd' })
 */

export const openFile = payload => {
  console.log('[Actions.open]: opening')
  atom.workspace.open(payload.path)
}

/**
 * Default action
 */

export const notFound = (_command, _payload) => {
  const err = new Error('unknown command')
  throw err
}
