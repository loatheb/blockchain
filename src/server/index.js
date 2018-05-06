const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/all', async ctx => {
  const content = fs.readFileSync(path.resolve(__dirname, '../../lib', 'data.bitchain'))
  const data = content ? JSON.parse(content) : []
  return ctx.body = data
})

router.get('/get/:hash', async ctx => {
  const content = fs.readFileSync(path.resolve(__dirname, '../../lib', 'data.bitchain'))
  const data = content ? JSON.parse(content) : []
  return ctx.body = data.filter(item => item.hash === ctx.params.hash)
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8090)
