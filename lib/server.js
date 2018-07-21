'use babel'
import Koa from 'koa'
import BodyParser from 'koa-bodyparser'

/*
 * A dispatcher thing.
 *
 *     dispatcher({ port }, ({ command, payload }) => {
 *       ...
 *     })
 */

export function dispatcher (options, handler) {
  console.log('[open-in-atom]', 'Starting server', options)

  const app = new Koa()

  // The current state
  let state = {
    listening: false,
    error: null,
    server: null
  }

  app.use(BodyParser())

  app.use(async ctx => {
    const { path } = ctx
    console.log('[server]', ctx.path)

    if (path.match(/^\/do\//)) {
      try {
        const result = await handler({
          command: ctx.path.slice(4),
          payload: ctx.request.body,
          ctx
        })

        ctx.body = { result }
      } catch (err) {
        console.error('[open-in-atom]', 'Dispatch error:', err.message)
        ctx.throw(500)
      }
    }
  })

  // This doesn't catch eaddrinuse :\
  app.on('error', (err) => {
    console.error('[open-in-atom]', 'Error:', err.message)
  })

  try {
    state.server = app.listen(options.port)
    state.listening = true
  } catch (err) {
    console.error('[open-in-atom]', 'Error starting server:', err.message)
    state.error = err
  }

  return {
    stop: stop.bind(null, state)
  }
}

/**
 * Stops the current server
 */

function stop (state) {
  return new Promise((resolve, reject) => {
    if (!state.listening) return resolve()
    state.server.close(err => {
      if (err) {
        console.error('[open-in-atom]', 'Error when stopping:', err.message)
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/*
 * Export
 */

export default dispatcher
