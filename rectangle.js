// exports.perimeter=(x, y) => (2*(x+y));
// exports.area=(x, y) => (x*y)
module.exports=(x,y,callback)=>{
    if (x<=0|| y<=0){
        setTimeout(()=>
        // I'm going to generate a new error object and then pass this in as the return value for the callback function, the first parameter.
        callback(new Error("Rectangle dimensions should be greater than zero: l = "
        + x + ", and b = " + y), 
    null),
    // So when you return an error ("here error means if x and y <0" as the first parameter, the second parameter will be ignored when that callback was just received by the node module from where we are calling this particular function there.
          
        2000);
    }
    else{
        setTimeout(()=>
        callback(null,{
            // perimeter:(x,y)=>(2*x*y),
            // area:(x,y)=>(x*y)
            // You dont need x and y again for this two function as it will take it from module.exports...this is a property of a 
            // node.js
            perimeter:()=>(2*x*y),
            area:()=>(x*y)
        }),
        2000);
        
    }
}

