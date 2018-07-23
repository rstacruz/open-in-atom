'use babel'
/* @flow */
/* global atom */

import { CompositeDisposable } from 'atom'
import dispatcher from './server'
import * as Actions from './actions'
import type { State, Action } from './types'
import getPort from 'get-port'
import * as PortFile from './port-file'

export default {
  subscriptions: null,

  /*
   * Activates the plugin; called on startup.
   */

  async activate (state: State) {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'open-in-atom:use-this-workspace': () => this.useThisWorkspace()
      })
    )

    return this.activateServer()
  },

  async activateServer () {
    const port = await getPort()
    console.log('[open-in-atom] using port', port)

    this.portfile = await PortFile.write({ port })

    this.dispatcher = dispatcher({ port }, context => {
      this.dispatch(context)
    })
  },

  /**
   * Restarts the server, ensuring that this workspace will be used.
   */

  async useThisWorkspace () {
    this.deactivate()
    return this.activateServer()
  },

  /**
   * Dispatches an action that was received from the RPC server.
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

  /**
   * Deactivates the server.
   */

  deactivate () {
    if (this.portfile) {
      PortFile.remove(this.portfile)
    }

    if (this.dispatcher) {
      this.dispatcher.stop()
    }
  }
}
