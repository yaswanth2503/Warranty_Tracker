

const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database')();
// const apiRoutes = require('./routes/index'); 
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, '..', 'client', 'public'), {
  index: false
}));


app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'..','client','public','login.html'));
});


// app.use('/api',apiRoutes); 

sequelize.sync()
.then(()=>{
    console.log('Database Connected');

    app.listen(PORT,()=>{
        console.log(`Server is running on port: http://localhost:${PORT}`);
    })
})
.catch((err)=>{
    console.error('Error connecting in database',err.message);
});