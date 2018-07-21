'use babel'
/* @flow */

import dispatcher from './server'
import * as Actions from './actions'
import type { State, Action } from './types'

export default {
  subscriptions: null,

  /*
   * Activates the plugin; called on startup.
   */

  activate (state: State) {
    this.dispatcher = dispatcher({ port: 58220 }, context => {
      this.dispatch(context)
    })
  },

  /*
   * Dispatch
   */

  dispatch ({ ctx, command, payload }: Action) {
    switch (command) {
      case 'openFile':
        return Actions.openFile(payload)

      case 'openWorkspace':
        return Actions.openWorkspace(payload)

      default:
        return Actions.notFound(command, payload)
    }
  },

  deactivate () {
    this.dispatcher.stop()
  },

  serialize () {
    return {}
  },

  config () {
    // Nothing
  }
}

// TODO: make port number configurable
// TODO: suppress error with port being open
