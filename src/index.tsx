/** @jsxImportSource hono/jsx */
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  )
}

// JSXをHTMLとして返す
app.get('/page', (c) => {
  return c.html(<View />)
})

// 生のレスポンスを返す
app.get('/', (c) => {
  return new Response('Good morning!')
})

app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret'
  })
)

// Basic認証
app.get('/admin', (c) => {
  return c.text('You are authorized!')
})

// 静的ファイルの処理
app.get('/static', serveStatic({ root: './', manifest: {} }))

export default app
