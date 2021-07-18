// var rect = {
// 	perimeter: (x, y) => (2*(x+y)),
// 	area: (x, y) => (x*y)
// }; 
// We will use require instead
var rect=require('./rectangle');

function solveRect(l,b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);

    rect(l,b,(err,rectangle)=>{
        if (err){
            // in rectangle.js we are sending either null or an error message...so if its not null then this will work or else statements below
            console.log("ERROR ",err.message);

        }
        else{
            console.log("The area of the rectangle of dimensions l = "
                + l + " and b = " + b + " is " + rectangle.area());
                //Calling area with no parameters as it will take directly from "rect(l,b,(...))""
            console.log("The perimeter of the rectangle of dimensions l = "
                + l + " and b = " + b + " is " + rectangle.perimeter());
        }

    });
    console.log("This statement after the call to rect()");
    // the function rect will work after 2 second delay as given in rectangle.js so in the mean time this line will get execute
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);