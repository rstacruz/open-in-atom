const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const EventEmitter = require('events')

/*
 * A dispatcher thing
 */

function run (handler) {
  app.use(bodyParser())

  app.use(async ctx => {
    const result = await handler({
      command: ctx.path,
      payload: ctx.request.body,
      ctx
    })

    ctx.body = ''
  })

  app.listen(3000)

  return {}
}

if (!module.parent) {
  run(({ ctx, command, payload }) => {
    console.log('<<<', command, payload)
    console.log('<--', ctx.method, ctx.path)
    console.log('     query:', ctx.query)
    console.log('     header:', ctx.request.header)
    console.log('     data:', ctx.request.body)
  })
}
