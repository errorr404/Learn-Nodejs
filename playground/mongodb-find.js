 const MongoClient = require('mongodb').MongoClient;
// const {MongoClient,ObjectID} = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/', { 'useNewUrlParser': true },(err,database)=>{
  if(err) {
     return console.log('unable to connect to MongoDB server');
  }else {

  console.log('Connected to MongoDB server');
  const db = database.db('TodoApp');
  db.collection('Todos').find().toArray().then((docs)=>{
    console.log('Todos');
    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log('unable to fetch the data');
  });
  database.close();
}

});
