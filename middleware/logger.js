 const myLogger = function  (req,res,next){
    console.log(`Route hit: ${req.method} ${req.path}`);
    next();
}


module.exports = {myLogger};