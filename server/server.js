var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate}= require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json()); // middleware

// creare Todo---
app.post('/todos',(req,res)=>{
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

// get all todo
app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

// get individual todo
app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

// delete todo
app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
      if(!todo) {
        return res.status(404).send();
      }
      res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  })
});

// update todo
app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed)&& body.completed) {
    body.completedAt = new Date().getTime();
  }
  else {
    body.completed=false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  })

});

//POST /Users

app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    // console.log(body);
    var user = new User(body);
    user.save().then(()=>{
      return user.generateAuthToken();
    }).then((token)=>{
      console.log('token in /users---',token);
        res.header('x-auth',token).send(user);
        console.log('after header send...')
    }).catch((e)=>{
      res.status(400).send();
    })
});



app.get('/users/me',authenticate,(req,res)=>{
  // var token = req.header('x-auth');

  // User.findByToken(token).then((user)=>{
  //   if(!user){
  //     return Promise.reject();
  //   }
  //   res.send(user);
  // }).catch((e)=>{
  //   res.status(401).send();
  // })
  console.log(req.user);
  res.send(req.user);
});

app.listen(3000,()=>{
  console.log('Started on port 3000');
});
