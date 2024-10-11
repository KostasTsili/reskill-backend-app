    const takeTwoReturnOne = (jsonOne, jsonTwo, next)=>{
        let finalJson = [];


        if(Array.isArray(jsonOne) && Array.isArray(jsonTwo)){
           
        let jsonOneData =[];
        let jsonTwoData =[];
        for(let item of jsonOne){
           jsonOneData.push(renameKeys(item,'post'));
        }
        for(let item of jsonTwo){
            jsonTwoData.push(renameKeys(item,'photo'));
         }
    
          finalJson = jsonOneData.map((item,index)=>{
            if(item.id===jsonTwoData[index].id){
                return {
                    ...item,
                    ...jsonTwoData[index]
                }
            }
         })
        }else{
            finalJson = {
                ...renameKeys(jsonOne,'post'),
                ...renameKeys(jsonTwo,'photo')
            }
        }


    return finalJson;
    next();
}

const renameKeys = (obj,name)=>{
    let renamedObject = {};
    Object.keys(obj).forEach((key)=>{
        if(key!=='id'){
           renamedObject[`${name}_${key}`] = obj[key];
         } 
         else renamedObject[key] = obj[key];
    })
    return renamedObject;
}

module.exports = {
    takeTwoReturnOne
}