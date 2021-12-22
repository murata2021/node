const fs=require('fs')
const axios=require('axios')

const myArg = process.argv[2];

console.log(myArg)



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


function catWrite(path, filename) { 

    let content;
    fs.readFile(filename,'utf8',(err,data)=>{
        if(err){
            console.log('ERROR: ',err)
            process.kill(1)
        }
        content=data

        fs.writeFile(path, content, err => {
            if (err) {
                console.log(`Couldn't write ${path}: `)
                console.error(" ",err.message)
                return
            }
            //file written successfully
          })
    })

}

async function webCatWrite(path, filename) { 

    let content;
    try{
         
        let res=await axios.get(filename)
        console.log(res.data.slice(0,15)+'...')
        content=res.data

        fs.writeFile(path, content, err => {
            if (err) {
                console.log(`Couldn't write ${path}: `)
                console.error(" ",err.message)
                return
            }
            //file written successfully
            })
    }
    catch(e){
        console.log(`Error fetching ${path}: `)
        console.log(`   Error: Request failed with status code 404`)
    }

}


if (myArg ==='--out'){
    console.log('hello')

    const path_to_write=process.argv[3]
    const read_from=process.argv[4]

    if (read_from.slice(0,4)==='http'){
        webCatWrite(path_to_write,read_from)
    }
    else{
        catWrite(path_to_write,read_from)
    }
}
else{

    if (myArg.slice(0,4)==='http'){
        webCat(myArg)
    }
    else{
        cat(myArg)
    }

}



