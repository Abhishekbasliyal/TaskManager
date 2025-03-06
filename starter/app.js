require('dotenv').config({
    path: `${__dirname}/.env`
});
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const mongoDB = require('./db/connect');
const notFound = require('./middleware/notfound');
const port = 3000;




const path = require('path');  
app.use(express.static(path.join(__dirname, 'public')));  

console.log('Serving static files from:', path.join(__dirname, 'public')); 





app.use(express.static('./public/index.html'));

app.use(express.json());

app.use('/api/v1/tasks', tasks);


app.use(notFound);

const start = async () => {
    try {
        await mongoDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`);
        });
    } catch (err) {
        console.log('Error:', err.message);
    }
};

start();
