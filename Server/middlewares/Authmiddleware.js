// const {verify}=require("jsonwebtoken")

// const validateToken=(req,res,next)=>{
//     const accessToken=req.header("accessToken");
    
//     if(!accessToken){
//         res.json({error:"Users not logged"})
//     }
//     try{
//         const validToken = verify(accessToken,"importantsecret");
//         if(validToken){
//             return next()
//         }
//     }
//     catch(error){return res.json({error:error})

//     }
// }
// module.exports = { validateToken };







const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("Authorization")?.split(" ")[1];

  if (!accessToken) {
    return res.status(403).json({ error: "User not logged in" });
  }

  try {
    const validToken = verify(accessToken, "importantsecret");

    // Check for token expiration
    if (validToken.exp && validToken.exp < Date.now() / 1000) {
      return res.status(401).json({ error: "Token has expired" });
    }

    // Token is valid
    req.user = { name: validToken.name,id:validToken.id };
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { validateToken };
