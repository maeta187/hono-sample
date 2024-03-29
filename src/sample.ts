import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// JSONレスポンス
app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!'
  })
})

// パスパラメータとURLクエリ(/posts/1?page=2)
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})

// POSTリクエスト
app.post('/posts', (c) => c.text('Created!', 201))

// DELETEリクエスト
app.delete('/posts/:id', (c) => c.text(`${c.req.param('id')} is deleted!`))

export default app
