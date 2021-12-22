const fs=require('fs')
const axios=require('axios')

const myArg = process.argv[2];

function cat(path){

    fs.readFile(path,'utf8',(err,data)=>{
        if(err){
            console.log('ERROR: ',err)
            process.kill(1)
        }
        console.log(data)
    })
}

async function webCat(path){

    try{
        let res=await axios.get(path)
        console.log(res.data.slice(0,15)+'...')
    }
    catch(e){
        console.log(`Error fetching ${path}: `)
        console.log(`   Error: Request failed with status code 404`)
    }
}

if (myArg.slice(0,4)==='http'){
    webCat(myArg)
}
else{
    cat(myArg)
}
