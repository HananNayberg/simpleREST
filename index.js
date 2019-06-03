
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const uuidv4 = require('uuid/v4')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//creating custom middleware for the app.post 
app.use((req,res,next) => {
    req.me = users[1];
    next();
})
let users = {
    1:{id: '1', username: 'Raf Morales'},
    2:{id: '2', username: 'Hanan Nayberg'},
    3:{id:'3', username: 'Eric Greenfield'}
};

let messages = {
    1: {id:'1', text: 'Hello World!', userId: '1'},
    2: {id:'2', text: 'Just fix it!', userId: '2'},
    3: {id:'3', text: 'It is Friday today!', userId: '3'}
};

//when the app get a GET req on /users -> respond with the users Object values
app.get("/users", (req, res, next) => {
    return res.send(Object.values(users));
});
//when the app get a GET req with userId > responds with the user 
app.get("/users/:userId", (req,res,next) => {
    return res.send(users[req.params.userId]);
});
//when the app get a GET request for /messages > respond with messages object values
app.get('/messages', (req,res)=> {
    return res.send(Object.values(messages));
});
//when the app get GET request with message+id > responds with message relates to id 
app.get('/messages/:messageId', (req,res)=> {
    return res.send(messages[req.params.messageId]);
});
//We generate a unique identifier for the message with the new library, use it as property in a message object, assign the message by identifier in the messages object – which is our pseudo database –, and return the new message after it has been created.
app.post('/messages', (req,res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.me.id,
    };
    messages[id] = message;
    return res.send(message);
    
});

app.post("/users", (req,res,next) => {
    res.send('Received a POST HTTP Method');
});

app.put("/users/:userId", (req,res,next) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`,
    );
});

app.delete("/users/:userId", (req,res,next) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`,
    );
});

app.delete('/messages/:messageId', (req,res) => {
    return res.send(messages[req.params.messageId]);
});

/* 
{
    const {[req.params.messgaeId]: message, ...otherMessages
} = messages;

messages = otherMessages;

return res.send(message);
});
*/
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

