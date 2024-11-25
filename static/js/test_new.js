var a = new Promise((resolve,reject)=>resolve()).then(console.log("ehila"));

const b = ["ciao",1,2,3]

if(b.includes("ciao")){
    setTimeout(()=> console.log("ciao"),1000)
}