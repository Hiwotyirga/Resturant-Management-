const {verify}=require("jsonwebtoken")

const validateToken=(req,res,next)=>{
    const accessToken=req.header("accessToken");
    
    if(!accessToken){
        res.json({error:"Users not logged"})
    }
    try{
        const validToken = verify(accessToken,"importantsecret");
        if(validToken){
            return next()
        }
    }
    catch(error){return res.json({error:error})

    }
}
module.exports = { validateToken };