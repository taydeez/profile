const fastify = require("fastify")({ logger: true });
fastify.register(require("fastify-routes"));

const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;

let ProfileSchema = new mongoose.Schema({
 name: String,
 age: Number,
 popular: String,
});

Profile = mongoose.model("Profile", ProfileSchema);

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASS}@mongodb:27017/profile?authSource=admin`;

try {
 mongoose.connect(mongoUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 });
} catch (error) {
 console.error(error);
}

//application routes
fastify.get("/profiles", (request, reply) => {
 Profile.find({}, (err, profiles) => {
   if (!err) {
     reply.send(profiles);
   } else {
     reply.send({ error: err });
   }
 });
});

fastify.post("/profile/add", (request, reply) => {
 const profile = request.body;
 console.log("the profile", profile);

 Profile.create(profile, (err, profile) => {
   if (!err) {
     reply.send(profile);
   } else {
     reply.send({ error: err });
   }
 });

 reply.send(profile);
});

//server
fastify.listen(80, "0.0.0.0", (error) => {
 if (error) {
   console.log(error);
 } else {
   console.log(`Server running, navigate to  http://localhost:80`);
 }
});


 