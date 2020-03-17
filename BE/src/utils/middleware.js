const jwt = require('jsonwebtoken');

module.exports = {
   auth(req, res, next) {
      const token = req.headers.authorization;
      if (token !== null) {
         req.user = jwt.verify(token, process.env.SECRET);
         next();
      } else {
         res.status(401).send('Your session has expired');
         return;
      }
   }
};
