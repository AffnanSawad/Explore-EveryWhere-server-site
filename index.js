const express = require('express')
const cors = require('cors')

//dotENV.. ETA NA DILE SERVER COLBE NA
require('dotenv').config()


//mongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express()
const port = process.env.PORT || 5000 ;


//MIDDLE WARE 

app.use( cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASS}@atlascluster.5qhzsjb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

console.log(uri);

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
    await client.connect();

     
    
    //add. DATABASE E PATHANOR JNNO
    const cardcollection = client.db('add_card_db').collection('newcard');
    

    const usercollection = client.db('add_card_db').collection('user');
    
    

       
    
       //get data

   app.get('/add', async(req,res) => {

    const cursor = cardcollection.find()

    const result = await cursor.toArray();

    res.send(result);


   }  )



   app.get('/user', async(req,res) => {

    const cursor = usercollection.find()

    const result = await cursor.toArray();

    res.send(result);


   }  )


  






    
    // DATA CLIENT => SERVER E PATHANO.
         app.post('/add', async(req, res) => {
       
            const newcard = req.body 
            console.log(newcard);


            const result = await cardcollection.insertOne(newcard)

            res.send(result);
            
           
        }
    )








   //get data

  // app.get('/add', async(req,res) => {

  //  const cursor = cardcollection.find()

  //  const result = await cursor.toArray();

 //   res.send(result);


 //  }  )



 //delete

 //delete





 // DATA CLIENT => SERVER E PATHANO.
 app.post('/user', async(req, res) => {
       
    const user = req.body 
    console.log(user);


    const result = await usercollection.insertOne(user)

    res.send(result);
    
   
}
)


//delete
//database theke delete kora . ERPOR CLIENT SIDE E EVENT HANDLE E FETCH KORTE HBE.
app.delete('/user/:id', async(req,res) => {

    const id = req.params.id

    console.log('delted from database',id)

    const query = { _id: new ObjectId(id)};
    const result = await usercollection.deleteOne(query)
     res.send(result);
  

   }  )



    //UPDATE ER JNNO
    app.get('/user/:id', async(req,res) => {

        const id = req.params.id
        const query = { _id: new ObjectId(id)};
        
        
        
        const result = await usercollection.findOne(query)

        res.send(result);

   
       }  )



        


       //UPDATE => UPDATE ER JNNO PUT USE HOI.
app.put('/user/:id', async(req, res) => {
        
    const id = req.params.id
    const filter = { _id: new ObjectId(id)}
    const options = {upsert: true};

    const updatedform = req.body ;

    const form = {
     
        $set: {
            name: updatedform.name,
            country_name: updatedform.country_name,
            city: updatedform.city,
            Area: updatedform.Area,
            photourl: updatedform.photourl,
            season: updatedform.season,
            popuation: updatedform.popuation,
            details: updatedform.details,
            email: updatedform.email
        }


    }

    
    const result = await usercollection.updateOne(filter,form,options)

    res.send(result);

   
}
)







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB! HERE WE GO!! ");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Explore-EverWhere IS RUNNING')
  })



 






  
  app.listen(port, () => {
    console.log(`Explore-EverWhere IS RUNNING on port ${port}`)
  })