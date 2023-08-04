/*import React from 'react';

function MongoDb(collection_name){
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const pass = "W4B2zcEPAIyahqEL";
    const uri = "mongodb+srv://niteesh8175:W4B2zcEPAIyahqEL@cluster0.pgnevai.mongodb.net/?retryWrites=true&w=majority";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });
    async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        client.connect();
        // Send a ping to confirm a successful connection
        client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const genCol = await client.db("mediastack_news_articles").collection(collection_name).find().toArray();
        return genCol;
    } finally {
        // Ensures that the client will close when you finish/error
        client.close();
    }
    }
    run().catch(console.dir);
  }

  export default MongoDb;*/