const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function authenticateToken(req,res,next){
    const token = req.session.token || req.cookies.jwtToken;
    if(!token) return res.status(401).json({error:'Unauthorized'});

    jwt.verify(token,secretKey,(err,user)=>{
        if(err) return res.status(403).json({error:'Forbidden'});
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;