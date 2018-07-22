'use babel'
/* @flow */

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
    const port = await getPort()
    console.log('[open-in-atom] using port', port)

    this.portfile = await PortFile.write({ port })

    this.dispatcher = dispatcher({ port }, context => {
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
    if (this.portfile) {
      PortFile.remove(this.portfile)
    }

    if (this.dispatcher) {
      this.dispatcher.stop()
    }
  }
}
