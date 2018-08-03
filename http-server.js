const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html'})
  res.write('<h1>Hello</h1>')
  res.end()
})

server.listen('9001', () => {
  console.log('http server started')
})