
const path = require('path');
const fs = require('fs');
module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);   
        }
        get() {
            if(this.HttpContext.path.queryString == '?'){
                //help request
               
                let Page = path.join(process.cwd(),"wwwroot/helpPages/MathsServiceHelp.html");
                let pageContent = fs.readFileSync(Page);
                this.HttpContext.response.content("text/html",pageContent);
            }
            else{
            if(  this.HttpContext.path.params.op)
            {
             if(this.HttpContext.path.params.x&&this.HttpContext.path.params.y)
             {

                if(this.HttpContext.path.params.op==' '){
                    this.HttpContext.response.JSON(addition(parseInt(this.HttpContext.path.params.x),parseInt(this.HttpContext.path.params.y)))
                  }
                  else if(this.HttpContext.path.params.op=='-'){
                    this.HttpContext.response.JSON(soustraction(parseInt(this.HttpContext.path.params.x),parseInt(this.HttpContext.path.params.y)))
                  }
                  else if(this.HttpContext.path.params.op=='*'){
                    this.HttpContext.response.JSON(multiplication(parseInt(this.HttpContext.path.params.x),parseInt(this.HttpContext.path.params.y)))
                  }
                  else if(this.HttpContext.path.params.op=='/'){
                    
                    this.HttpContext.response.JSON(division(parseInt(this.HttpContext.path.params.x),parseInt(this.HttpContext.path.params.y)))
                  }
                  else if(this.HttpContext.path.params.op=='%'){
                    this.HttpContext.response.JSON(modulo(parseInt(this.HttpContext.path.params.x),parseInt(this.HttpContext.path.params.y)))
                  }

             }
             else if (this.HttpContext.path.params.n)
             {
                if(this.HttpContext.path.params.op=='!'){
                    this.HttpContext.response.JSON(factorial(parseInt(this.HttpContext.path.params.n) ))
                  }
    
                else if(this.HttpContext.path.params.op=='p'){
                    this.HttpContext.response.JSON(isPrime(parseInt(this.HttpContext.path.params.n)))
                  }
                 else if(this.HttpContext.path.params.op=='np'){
                    this.HttpContext.response.JSON(findPrime(parseInt(this.HttpContext.path.params.n)))
                  }
             }
             else {
                this.HttpContext.response.JSON({error:"invalid params"})
             }      
            }
            else{
                let message ={error: "op missing"};
                this.HttpContext.response.JSON(message);
            }
        }
     
    }
    
}
function addition(x,y){

    if(x==NaN){
        return {op:"+",x:null,y,error:"'x' parameter is missing"}
    }
    if(y==null){
        return {error:"un des nombres est manquant"}
    }
    if(x==NaN||y==NaN){
        return {error: "not a number"}
    }
    let value = x+y;
    return {op:"+",x,y,value} 
}
function soustraction(x,y){
    if(x==null||y==null){
        return {error:"un des nombres est manquant"}
    }
    if(x==NaN||y==NaN){
        return {error: "not a number"}
    }
    let value =x-y;
    return {op:"-",x,y,value}
}
function division(x,y){
    if(x==null||y==null){
        
        return {op:"/",x,y,value:"NaN"}
    }
    if(x==0){
        return{op:"/",x,y,value:"NaN"}
    }
    if(y==0){
        return {op:"/",x,y,value:"Infinity"};
    }
   
    if(x==NaN||y==NaN){
        return {op:"/",x,y,value:"NAN"}
    }
    let value =x/y;
    return {op:"/",x,y,value}
}
function multiplication(x,y){
    if(x==null||y==null){
        return {error:"un des nombres est manquant"}
    }

    if(x==0||y==0){
        return {error: "division par 0 impossible"};
    }
    if(x==NaN||y==NaN){
        return {error: "not a number"}
    }
    let value =x*y;
    return {op:"*",x,y,value}
}
function modulo(x,y){
    if(x==null||y==null){
        return {error:"un des nombres est manquant"}
    }
    if(x==0||y==0){
        return {op:"%",x,y,value:"NaN"};
    }
    if(x==NaN||y==NaN){
        return {error: "not a number"}
    }
    let value =x%y;
    return {op:"%",x,y,value}
}
function factorial(n){
    if(n===0||n===1){
      return 1;
    }
    if(n==NaN){
        return {error: "not a number"}
    }
    if (n<0){
        return {n,op:"!",error:"'n' parameter must be a integer > 0"}
    }
    let value=n;
    for(var i = n-1;i>0;i--){
        value*=i;
    }
    //let value = n*factorial(n-1);

    return {n,op:"!",value}
}
function isPrime(n) {
    if(n==NaN){
        return {error: "not a number"}
    }
    for(var i = 2; i < n; i++) {
        if(n % i === 0) {
            return false;
        }
    }
    let trueFalse=false;
    if(n>1)
    {trueFalse=true;}
    

    let value=trueFalse;
    return {n,op:"p",value} 
}
function findPrime(n){
    if(n==NaN){
        return {error: "not a number"}
    }
    let primeNumer = 0;
    if(n<0){
        return  {error: "un nombre en bas de 1 n'est pas premier"};
    }
    for ( let i=0; i < n; i++){
        primeNumer++;
        while (!IsPrime(primeNumer)){
            primeNumer++;
        }
    }
    let value = primeNumer;
    return{n,op:"np",value}
}
function IsPrime(n){
    for(var i = 2; i < n; i++) {
        if(n % i === 0) {
            return false;
        }
    }
    let trueFalse=false;
    if(n>1)
    {trueFalse=true;}
    

    return trueFalse;
}
