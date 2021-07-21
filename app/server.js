const fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-routes'))
fastify.register(require('fastify-axios'))

//application routes
fastify.get('/books', async (request, reply) => {
   const { data, status } = await fastify.axios.get("https://openlibrary.org/works/OL45883W.json");
       reply.send(data)
})


//server
fastify.listen(80,'0.0.0.0', (error) => {
   if (error) {
       console.log(error)
   } else {
       console.log(`Server running, navigate to  http://localhost:80`)
   }
})
