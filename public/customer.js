var socket = io()
socket.on('connect', () => {
  console.log('server connected')

  socket.on('data', data => {
    console.log('data')
  })
})