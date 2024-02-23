const express=require('express')
const { body, validationResult } = require('express-validator');
const    sanitizationData =
     [
    body('username').trim().escape().isAlphanumeric(),
    body('password').trim().escape().isLength({ min: 5 }),
    (req,res,next)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

     ]
     /*
    const validationErreur = (err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
          return res.status(400).json({ error: 'Invalid JSON syntax' });
        }
        next();
      }
      */

      function verifierToken(req,res,next){
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
          const bearerToken = bearerHeader.split(' ')[1];
          req.token = bearerToken;
          next();
        } else {
          res.sendStatus(403);
        }
      
      
      }

      module.exports={
        sanitizationData,
        verifierToken,


      }
