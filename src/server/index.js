const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.redirect('/', 'all')
// router.get('/all')
// router.get('/get/:hash', )
// router.post('/transaction', )

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8090)
