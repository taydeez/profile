const fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-routes'))
const fs = require('fs');

let rawProfiles = fs.readFileSync('profiles.json');
let profiles = JSON.parse(rawProfiles);


//application routes
fastify.get('/profiles', (request, reply) => {
   reply.send(profiles)
})

fastify.post('/profile/add', (request, reply) => {
   const profile = request.body
   profiles.profiles.push(profile)

   let data = JSON.stringify(profiles);
   fs.writeFileSync('profiles.json', data);

   reply.send(profiles)
})

//server
fastify.listen(80,'0.0.0.0', (error) => {
   if (error) {
       console.log(error)
   } else {
       console.log(`Server running, navigate to  http://localhost:80`)
   }
})

