const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http')
const socketIO = require('socket.io')

const httpServer = http.createServer(app)
const io = socketIO(httpServer)
console.log(httpServer)

var customers = [];
function initdata() {
  customers.push({ id: 1})
  customers.push({ id: 2})
  customers.push({ id: 3})
  customers.push({ id: 4})
  customers.push({ id: 5})
}
initdata()

io.on('connection', function(socket){
  console.log('a customer connected');
  socket.emit('data', 'Some data ...')
})
app.use(bodyParser.json())
app.use(express.static('./public'))
app.set('views', './public/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('cust', {
    customers: customers
  })
})

app.get('/customers', (req,res) => {
  res.json(customers)
})

app.get('/customers/:id', (req,res) => {
  const customer = customers.find(customer => customer.id === parseInt(req.params.id))
  if(customer) {
    res.json(customer)
  }
  else {
    res.status(404).json(null).end()
  }
})

app.post('/customers', (req, res) => {
  const customer = req.body
  if(customer.id < 0 ) {
    res.status(400).json(null)
  }
  else {
    customers.push(customer)
    res.status(201).setHeader("location", 'customers/' + customer.id)
    res.json(null)
  }
  
})
const port = process.env.PORT || 8000
httpServer.listen(port, () => {
  console.log('server listening at 8000')
})