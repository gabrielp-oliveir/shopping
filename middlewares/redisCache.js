const {redisClient} = require('../redis')

const returnCache = async (req, res, next) => {
    try {
        const slow = req.query.slow?req.query.slow: req.body.slow;
     
        let cacheKey =  req.originalUrl
        const cacheResponse = await redisClient.get(cacheKey)
        const response =JSON.parse(cacheResponse)
        
        if(cacheResponse){        
            if(slow){
                setTimeout(() => {
                    return res.send(response)
                }, slow*1000)
              }else{
                  return res.send(response)
              }       
        }else{
            if(slow){
                setTimeout(() => {
                    next()
                }, slow*1000)
              }else{
                  next()
              }  
        }
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
    
}
module.exports = {returnCache}