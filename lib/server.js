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
  // TODO: handle case when it can't listen
  console.log('[server] dispatcher starting')
  console.log('[server]', options)
  const app = new Koa()

  app.use(BodyParser())

  app.use(async ctx => {
    const { path } = ctx

    if (path.match(/^\/do\//)) {
      try {
        const result = await handler({
          command: ctx.path.slice(4),
          payload: ctx.request.body,
          ctx
        })

        ctx.body = { result }
      } catch (e) {
        ctx.throw(500)
      }
    }
  })

  app.listen(options.port)

  return { stop: () => true }
}

/*
 * Run
 */

if (!module.parent) {
  dispatcher({ port: 58220 }, ({ ctx, command, payload }) => {
    console.log('<<<', command, payload)
    console.log('<--', ctx.method, ctx.path)
    console.log('     query:', ctx.query)
    console.log('     header:', ctx.request.header)
    console.log('     data:', ctx.request.body)
  })
}

export default dispatcher
