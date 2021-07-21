const fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-routes'))
//application routes
fastify.get('/ping', async (request, reply) => {
       reply.send('I am a service from systems host')
})


//server
fastify.listen(8300,'0.0.0.0', (error) => {
   if (error) {
       console.log(error)
   } else {
       console.log(`Server running, navigate to  http://localhost:8300`)
   }
})