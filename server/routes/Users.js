var  express  = require('express'),
     users    = express.Router(),
     cors     = require('cors'),
     jwt      = require('jsonwebtoken'),
     bcrypt   = require('bcryptjs');

const User = require('../models/User');

users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  var userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }
  console.log(userData.first_name);
  console.log(userData.last_name);

  if(userData.first_name =="" || userData.last_name == "" || userData.email == "" || userData.password == ""){
    return res.json({
      msg: 'please fill in all the details',
      success : false
    });
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              return res.send("you have successfully registered and can Login!");
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {// changed here!
        return res.json({ success: false, msg: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {

  var {email, password} = req.body;

  if(!email || !password){
    return res.json({success :false, msg: "please fill in all the details!"});
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        } else {
          // Passwords don't match //chnaged here
          console.log("passwords donot  match !");
          return res.json({ success: false, msg: 'Password doesnot match !' })
        }
      } else { // chnaged here
        console.log("user doesnot exsits");
        return res.json({ success: false, msg: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users;
