const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (e) {
    res.status(400).send({ msg: 'Token is not valid' });
  }
};




