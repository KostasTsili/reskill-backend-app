 const {format} = require('date-fns');
 const { v4: uuidv4 } = require('uuid');
 const fs = require('fs');
 const fsPromises = require('fs').promises;
 const path = require('path');


 uuidv4();


 
 const logger = function  (req,res,next){
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`,'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
}

const logEvents = async (message,logFileName)=>{
    const dateTime = `${format(new Date(), 'dd/MMyyyy\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(__dirname,'..','logs');
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logFileName),logItem);
    }catch(e){
        console.log(e.message);
    }

}

module.exports = {logger, logEvents};
