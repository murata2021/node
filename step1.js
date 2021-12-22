const fs=require('fs')


const myArg = process.argv[2];
let content;
function cat(path){

    fs.readFile(path,'utf8',(err,data)=>{
        if(err){
            console.log('ERROR: ',err)
            process.kill(1)
        }
        console.log(data)
        
    })

}

cat(myArg)
