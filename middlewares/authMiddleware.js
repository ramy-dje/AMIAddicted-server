const jwt = require('jsonwebtoken')

const authorizeRoles = (...roles)=>{
  return async (req,res,next)=>{
     
      if(!roles.includes(req.user.role)){
        res.status(403).json({error:`the role ${req.user.role} doesn't  existes for this user` });
      }else{
        next();
      }
      
  }
}

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'your session is expied' });
  }

  try {
    const decoded = jwt.verify(token, "sp0iowu;af655$7698yr&^%^$(Q#*sd65f");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'error' });
  }
};

module.exports = { };
