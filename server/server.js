const express = require('express');
const cors = require('cors');
const path = require('path'); 
const { sequelize } = require('./models/index'); 

const apiRoutes = require('./routes/index');
// const authRoutes = require('./routes/auth');

const app = express();

// Middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API Routes
app.use('/api', apiRoutes);


// app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public/login.html"));
})


sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
  