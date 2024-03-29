const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const User = require('./model/user');
const app = express();
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authenticateToken = require('./middleware/authenticateUser');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const allowedOrigins = [
  'http://localhost:5173',
  'https://taskmanagement-cripttions-projects.vercel.app',
  'https://taskmanagement-virid.vercel.app',
  'https://task-management-okh1.onrender.com',
  // Add other origins as needed
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: 'cripttionsaworkd21389kdsjfa',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Always set to true on Render
      sameSite: 'none', // Needed for cross-site cookies
    },
  })
);

connectDB();

const secretKey = process.env.SECRET_KEY;
app.use(express.static('dist'));

app.post('/login', async (req, res) => {
  const userID = req.body.userID;
  const password = req.body.password;

  try {
    const userData = await User.findOne({ UserID: userID }).exec();
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (password !== userData.Password) {
      return res.status(404).json({ message: 'Password mismatched' });
    }

    const token = jwt.sign(
      { userID: userData.UserID, username: userData.Name },
      secretKey,
      { expiresIn: '1h' }
    );
    req.session.token = token;
    res.cookie('jwtToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.status(200).json({ message: 'Login successful', token: { token }, userData });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error while login' });
    console.error(error);
  }
});

app.post('/addUser', async (req, res) => {
  const userID = req.body.userID;
  const password = req.body.password;
  const name = req.body.name;

  try {
    const user = new User({
      Name: name,
      UserID: userID,
      Password: password,
      Task: [],
    });

    await user.save();
    res.status(200).json({ message: 'User registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error while user registration' });
    console.error(error);
  }
});

app.use('/', authenticateToken, routes);

app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
