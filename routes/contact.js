var express = require('express');
var router = express.Router();
const correoModel = require('../models/correoModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  let status_session;
  if(req.session.usuario || req.session.admin) {
      status_session = true
  } else {
      status_session = false
  }
  res.render('contact', { title: 'Contact Us', session : status_session});
});

//POST (recibe datos y envia correo)
router.post('/',async (req,res,next)=> {
  let objMsg = {
      name: req.body.name,
      email : req.body.email,
      message : req.body.message
  }
  let respuesta = await correoModel.main(objMsg);
  if(respuesta) {
      res.render('contact', {status : true,message : 'Message sent. We will contact you ASAP'})
  } else {
      res.render('contact', {status : false,message : 'There was an error. Please try again later'})
  }
})

module.exports = router;