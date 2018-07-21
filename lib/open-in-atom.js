'use babel'
/* @flow */
/* global atom */

import { CompositeDisposable } from 'atom'
import dispatcher from './server'
import * as Actions from './actions'
import type { State, Action } from './types'

export default {
  subscriptions: null,

  /*
   * Activates the plugin; called on startup.
   */

  activate (state: State) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    this.dispatcher = dispatcher({ port: 58220 }, context => {
      this.dispatch(context)
    })

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'open-in-atom:config': () => this.config()
      })
    )
  },

  /*
   * Dispatch
   */

  dispatch ({ ctx, command, payload }: Action) {
    console.log('[dispatch]', command, payload)
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
    this.subscriptions.dispose()
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
