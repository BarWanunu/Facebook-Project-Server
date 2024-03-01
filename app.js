import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import cors from 'cors';
app.use(express.static('public'));
app.use(cors());
// Middleware to parse JSON data
app.use(bodyParser.json());

// Route to handle the POST or PATCH request
app.post('/login', (req, res) => {
  const { displayName, password } = req.body;
  if (displayName == 'guest' && password == 'Aa12345678') {
    
    res.json({ message: 'Authentication successful' });
  }
  else{
    return res.status(401).json({ message: 'Invalid username or password' });

  }

});
app.listen(80)