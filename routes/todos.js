let express = require('express');
let router = express.Router();
let db = require("../models");
let jwt = require('jsonwebtoken');



router.get('/', (req, res) => {
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err)
    })
});

router.post('/', function(req, res){
    // console.log(req.body);
    db.Todo.create(req.body)
    .then( function(newTodo){
        res.status(201).json(newTodo)
    })
    .catch(function(err){
        res.send(err)
    })
});

router.post('/post', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                message: "post created ...",
            });
        }
    });
});

// Middleware verifyToken
router.get('/login', (req, res) => {

    const user = {
        id: 1,
        username: 'angel',
        email:'angel@gmail.com'
    }

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.cookie('Bearer', token);
        // window.localStorage.setItem('Bearer', token)
        res.json({token});
    });
});

router.get('/:todoId', function(req, res){
    db.Todo.findById(req.params.todoId)
    .then( function(foundTodo){
        res.json(foundTodo)
    })
    .catch( function(err){
        res.send(err)
    })
})

router.put('/:todoId', function(req, res){
    // res.send('update');
    // req.body is what you are going to update. It contains the object 
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
});

router.delete('/:todoId', function(req, res){
    // res.send('update');
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: 'We deleted it'});
    }) 
    .catch(function(err){
        res.send(err);
    })
});

// Middleware
function verifyToken(req, res, next){
    // Gives you the token
    const bearerHeader = req.headers['authorization'];
    // Check if holder is undefined
    if( typeof bearerHeader !== 'undefined'){
         // If there is a token || bearer<access_token>
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Done
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;