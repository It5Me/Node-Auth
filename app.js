const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRouters');
const app = express();
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI =
  'mongodb+srv://admin1:3QgJZPb2awO9A9LM@cluster0.muyw3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => console.log('Connected Database'))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('Set-Cookies', 'newUser=true');

//   res.send('you got the cookies!');
// });
app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  // console.log(cookies);
  res.json(cookies);
});

app.use(authRoutes);
app.listen(3000, () => {
  console.log('server running on port 3000');
});
