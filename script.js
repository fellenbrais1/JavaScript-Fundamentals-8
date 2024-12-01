'use strict';

// SCOPING IN PRACTICE

const firstName = 'Michael';

// We can log the firstName variable inside this function scope because firstName is declared the global scope and can be found using variable lookup.
// As the variable is not present in this scope the engine looks up at the parent's scope to find it. A variable that is not defined anywhere in this function's scope chain will result in a reference error as it will not be able to be found.
function calcAge(birthYear) {
  const age = 2024 - birthYear;

  // If we define a function inside of another function, it call access all of the variables defined in the parent scopes. In this case this means it can find the age variable and the birthYear variable form the parent's scopes.
  function printAge() {
    const output = `Hello, ${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    // Now, we have created another block scope within this function scope, the str vairbale cannot be used outside of this block scope, unless we pass it up manually, or we declare this as a var, which will make it function-scoped, not block-scoped.
    if (birthYear >= 1981 && birthYear <= 1996) {
      // You can create a variable with a name that already exists within the scope chain, JavaScript will find the nearest possible instance of that variable in the scope chain, Therefore, if there is a variable with the same name in this scope and the parent scope, JavaScript will use the instance declared in this scope. This will not change the value of the instance in the parent scope.
      // Its not a problem to have many variables with the same name as it will be specific to each inner scope. Perhaps this is not best practice, but it does let us create functions that use the exact same paremeters without a problem.
      const firstName = 'Steven';

      var millenial = true;
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      // Functions are also block-scoped in strict mode as of ES^, if we turn off strict mode, the function will not be block-scoped.
      // function add (a, b) {
      //   return a + b;
      // }

      // If we redefine a variable that exists in the outer scope this will not be allowed in the case of consts, as we are trying to mutate an immutable variable.
      // However, if we create a new variable with the same name as an outer scope's variable, it will count as a new, completely different variable in this inner scope. When we leave this scope, variable lookup will use the original instance of this variable in the parent scopes.
      // output = `NEW OUTPUT`;
      const output = `NEW OUTPUT`;
      console.log(output);
    }
    // str cannot be accessed outside of the block as it is a block-scoped const, but millenial can be, as it is a function-scoped var.
    // console.log(str);
    console.log(millenial);
    // add(2, 3);
  }
  printAge();

  //   console.log(firstName);
  //   console.log(lastName);
  return age;
}

calcAge(1988);
// In this case, the age variable is not available because it is in an inner scope, and variable lookup does not work in that direction. We would have to create a new variable called age that captures the return value of the calcAge function if we wanted to use this.
// console.log(age);

let age = calcAge(1985);
console.log(age);

// HOISTING AND TDZ IN PRACTICE

// Hoisting with variables
// vars are set to 'undefined' in the code until their initialization so we will get a result of 'undefined' if we access it before that.
console.log(me);
// let variables cannot be accessed before its initialization as it is still in the TDZ at this point, a reference error will occur.
// console.log(job);
// const variables  are also in the TDZ until their initialization so it will cause a reference error.
// console.log(year);

var me = 'Michael';
// let job = 'teacher';
// const year = 1988;

// Hoisting with functions.

// Function declarations are hoisted and so can be accessed before the point in the code where they are declared.
console.log(addDecl(1, 2));

// Function expressions are not hoisted unless they are defined with var, otherwise, they will not be able to be accessed before their declaration. Even if declared with var, but this will result in a different error: functionName is not a function, var is set as 'undefined' as its initial value, so we are trying to call a function defined as 'undefined'.
// console.log(addExpr(1, 2));

// Also like function expressions, arrow functions are not hoisted when defined as const or let, but will be when defined with var, but this will result in a different error: [functionName] is not a function, var is set as 'undefined' as its initial value, so we are trying to call a function defined as 'undefined'.
// console.log(addArrow(1, 2));

function addDecl(a, b) {
  return a + b;
}

// let addExpr = function (a, b) {
//   return a + b;
// };

// const addArrow = (a, b) => a + b;

// A mistake that can easily be made.

// In this we delete all producsts from the shopping cart if their number is 0. However, we are relying on the fact that 0 is a falsey value, if we are using a var before its declaration however, it will have the value of 'undefined', even if hoisted, which is also a falsey value. This means that the logic will be faulty and will always delete the contents of the cart, which could be extremely erroneous and dangerous behaviour.
if (!numProducts) {
  deleteShoppingCart();
}

// If this variable was declared as let or const, it would not be accessible by the if block as it has not be declared yet.
var numProducts = 10;

function deleteShoppingCart() {
  console.log(`All products deleted!`);
}

// Best practice is just to not use var at all, as it can introduce some strange behaviour. It is better to define all variables at the top of the scope where they will be used, and to define all functions at the top of the page and then call them later.

// We can also see if variables declared using different keywords create an entry in the global window object of the browser. (To access the global window object, we can go into the browser Dev tools and look at the console. If we type in 'window' we can see the global window object) Var variables will create a property on the window object, but let and const will not until they are defined and used.

var x = 1;
let y = 2;
const z = 3;

// We can test that the variable is the same as its window object, for var it will be true as the window objext knows the value of the variable before declaration, but let and const variables will be unitialized before their declaration so the value of the variable and the value in the global window object will be different.
console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

// THE 'THIS' KEYWORD IN PRACTICE

// A call to 'this' from the global scope will give us the global window object.
console.log(this);

// Calling 'this' in the context below will result in a value of 'undefined', as this is effectively a regular function call and there is no parent element or object for this to point to, there is no owner. In 'sloppy mode' this would also point to the global window object. In this case, the 'this' keyword belongs to this function.
const calcAge2 = function (birthYear) {
  console.log(2024 - birthYear);
  console.log(this);
};

calcAge2(1988);

// If we wrote the same function as an arrow function then a call to this would again give us the global window object. This is because arrow functions use the lexical this of their parent element, which in this case is the global object, or the top-level scope. The 'this' keyword would therefore point to the this keyword's value in the global scope. In this case, the 'this' keyword does not belong to this function, but to the global object.
const calcAge3 = birthYear => {
  console.log(2024 - birthYear);
  console.log(this);
};

calcAge3(1988);

// In this case, the 'this' keyword will point to the object that is calling the function, here, the objext called 'michael'.
// We could change 'this' to something more useful like 'this.year' in order to grab some specific information inside the object.
const michael = {
  year: 1988,
  calcAge4: function () {
    console.log(this);
    console.log(2024 - this.year);
  },
};

michael.calcAge4();

// Remember, that the 'this' keyword does not point at the function we wrote it within, but to its object or element owner.

// we can borrow a method from another object like in this example below:

const ayako = {
  year: 1985,
};

// Here we assign a calcAge4 function that is the same as the calcAge4 function within the object 'michael'. This called 'function borrowing', and it can save us a lot of duplication. We could write a prototype object and then assign new object instances the same functions in this way.
ayako.calcAge4 = michael.calcAge4;
ayako.calcAge4();

// The 'this' keyword is dynamic, and changes depending on how a function is called. Therefore, we have to pay attention to how we call a function and how we use 'this'

// If we read the value of a const that we make we can see the properties of that function in the Devtools by searching its name.
// const f = michael.calcAge4;
// Using this regular function call will result in an error, because there is no this.year for the function to look at, the ths keyword returns 'undefined' so there is no year property on it. This happens because this f() call is just a regular function call with no owner, which means that 'this' will always equal 'undefined'.
// f();

// REGULAR FUNCTIONS VS. ARROW FUNCTIONS
// Please follow the order of the numbers in this section of the notes.

// 2. However, if we define a variable in the global scope with the same name, the variable lookup will use this variable in the this.firstName2 call in the arrow function, that means we will see its value in our output. This is because it is on the window object. As this could be problematic, we shouldn't really use var.
// var firstName2 = 'Ayako';

const mickey = {
  firstName2: 'Michael',
  year: 1988,
  calcAge5: function () {
    console.log(this);
    console.log(2024 - this.year);

    // 4. Adding a method inside a function to see how this behaves with 'this'

    // 5. In the case shown below, the 'this' keyword is undefined, this is because this a regular function call, even though it happens as a method. So, this is not the correct way to do things as it will result in an error.
    // const isMillenial = function () {
    //   console.log(this);
    //   console.log(this.year >= 1981 && this.year <= 1996);
    // };
    // isMillenial();

    // 6. We can normally use an outside variable to define the 'this' object that we want called 'self', then we can use this variable as a way to access this data inside functions etc. This can be a lot easier than trying to work out how 'this' works and what variables are available where. Another common variable name to use in this situation is 'that'. These solutions are usually seen in pre ES6 code.
    const self = this;
    const isMillenial2 = function () {
      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    isMillenial2();

    // 7. There is a more modern solution to the problem shown in 6. This solution is to use an arrow function, as it does not have its own 'this' keyword and will use the 'this' keyword of its parent scope. This is actually what we want in this case as it allows the function to easily reference what it needs to from the object a level above.
    const isMillenial3 = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial3();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey, ${this.firstName2}`);
  },
};

// 1. In this case, the value of 'this' is undefined because arrow functions do not have a 'this' value, so it is looking up at the global scope's 'this' which equates to undefined. This is actually the window object. So, we don't get what we want because there is no firstname2 in the global window object.
mickey.greet();

console.log(mickey.calcAge5(this.year));
console.log(this.firstName2);

mickey.calcAge5();

// 3. We should never really use an arrow function as a method, as we run into problems like this because there is no 'this' keyword for an arrow function. Keep arrow functions for very simple things and don't make them rely heavily on outside variables etc. beyond a very simple complexity. if we use a regular function in this situation, it would get a 'this' keyword and things would work as we thought it would.

// 8. Experiments with different types of functions.

const addExpr = function (a, b) {
  // 9. We can log the arguments object of a function to see what has been passed into it. We can actually pass more arguments into a function than it needs in Javacript, there will not be an error, but those extra arguments will not get a name and of course will not get used by anything. We can see these extra arguments in the arguments object's array if we log it in this way. We can use this array inside the arguments array to loop through and for example, add all of the numbers together.
  console.log(arguments);
  return a + b;
};
addExpr(2, 5, 8, 12);

// 10. However, there is no arguments keyword created for an arrow function, so be careful trying to manipulate them in this way.
const addArrow = (a, b) => {
  // console.log(argumemts);
  return a + b;
};

addArrow(2, 5, 8);

// A  HIGH-LEVEL OVERVIEW OF JAVASCRIPT

// A very verbose but accurate description of what JavaScript is:
// JavaScript is a high-level, prototype-based object-oriented, multi-paradigm, interpreted or just-in-time compiled, dynamic, single-threaded, garbage-collected, programming language with first-class functions and a non-blocking event loop concurrency model.

// To break things down:

// High-level:
// A high-level language means we don't need to manually manage computer resources like storage or memory. Something like C++ is a low-level language that allows you total control over the resources, but is hard to use as a result, as you have to allocate and de-allocate memory as needed. High-level langauges like Python or JavaScript have abstractions to make it easier to use as a human, meaning there is less total control over these resources, but we don't need to worry about things like memory allocation which can make programming a lot simpler and quicker.

// Prototype-based object-oriented:
// Almost everything in JavaScript apart from primitive values are objects. We create objects from a template blueprint called a prototype, and the objects inherit all of the object methods applicable to it from this prototype, there is a lot more regarding this and object-oriented-programming but it will be covered later.

// Multi-paradigm:
// A paradigm is an approach and mindset of structuring code, which directs coding styles and technique. JavaScript allows for multiple paradigms to be utilised, procedural-programming, object-oriented-programming (OOP) and functional-programming, as well as imperative and declarative paradigms. Some languages only allow one or some of these paradigms but JavaScript is more flexible and allows us to use any of these paradigms.

// Interpreted or just-in-time compiled:
// A language that is interpreted into machine code as it is being run, or just before it will be run. This allows us to use the abstraction of human-readable code which is converted to machine code at the time of running or just before. This happens within the JavaScript engine. Just-in-time compilation will be covered more in  the next sections.

// Dynamic:
// JavaScript is a dynamically-typed language, the engine will infer the type of a variable based on its content and other commands that we can specify. Many languages such as Rust need us to specifically tell the program what type it is. TypeScript is like JavaScript, but is strongly typed like Rust. A dynamic language means that we don#t have to worry about telling the engine which type a variable is, apart from in certain situations where it might need some help.

// Single-threaded:
// This is a complex topic. A thread is a list of commands and taks that a computer performs. Some languages can be multi-threaded, so they can handle more than onelist of commands at the same time. JavaScript is single-threaded, so there is only one list that can be run at any one time. There are ways to get around this such as by using asynchronous JavaScript and event loops as described below.

// Garbage-collected:
// A langauge where functions, objects, and variables in memory and storage will be automatically cleaned up when out of scope of no longer being used in order to free up resources. In low-level languages we have to do this manually. In high-level languages this is taken care of automatically. This is good but can sometimes cause problems, like garbage being collected during another process and slowing it down.

// First-class functions:
// Functions are treated as both functions and variables, allowing us to pass functions into othger functions and returning functions from functions as well. This is something that cannot be done in some languages but it is very powerful and usable in JavaScript.

// Event loop concurrency model:
// This is a complex topic. A concurrency model is how the JavaScript engine handles mutliple tasks happening at the same time. As JavaScript is single-threaded, we need another way to allow more than one action to happen at the same time, this is where promises and awaits come into play as we need to run code in an asynchronous way. We use event-loops to execute long-running tasks in the background and then returning them to the single thread when they are ready. Asynchronous JavaScript is a lot harder than normal JavaScript but can be extremely powerful and useful. Event loops also handle things like eventHandlers, which will effectively always be looking out for the event to happen, and then running their code when the event happens.

// THE JAVASCRIPT ENGINE AND RUNTIME

// The JavaScript engine
// This is simply the program that compiles JavaScript to machine code and then exectes the program. Engines execute the code, like Google's V8 engine that runs JavaScript and Node.js. All browsers have their own engines but they mostly follow the exact same specifications so we don't nee dto worry about this too much unless we want to really optimize something. The engine contains both a memory stack and a heap for memory management, as well as the JavaScript call stack.

// Compilation vs. Interpretation
// Compilation writes the source code into machine code all at once, which is then written into a portable file that can be run by any computer. Therefore, execution is a different step that happens after compilation has been completed. Code that we execute on websites etc. has already been compiled ahead of time.

// In interpretation, the code is being converted, read, and executed all at the same time. The code runs line by line and compiles just in time for operation. This is fine, but it can be much slower than compiling first especially nowadays. JavaScript is not really just interpreted anymore as this is too slow for modern browsers and executions, JavaScript now uses a mix between line by line interpretation and compilation called just-in-time compilation.

// Just-in-time compilation
// In just-in-time compilation, the source code is compiled into machine code and is then executed immediately after compilation. No portable file is created, and the engine instead relies on its interpreter to parse the code and then compile it. This offers a nice balance between compilation and line by line interpretation, without having to take extra time and memory to create the portable file that could be run elsewhere. To do this, the engine first has to parse the code.

// During parsing, the code is split up into pieces that mean something to the computer (variables, functions, methods etc.) and these pieces are saved into something called the AST (Abstract Syntax Tree). These pieces on the tree contain all of the information the interpreter needs to convert them into machine code and then execute them. AST trees can be incredibly complex even for simpler code. The AST has nothing to do with the DOM, it is just a representation of our code in the engine.

// The next step is to take the AST and compile it into machine code. After this, the code is immediately executed. To allow things to run as quickly as possible, this will generate a very un-optimized version of the code in the beginning, just to get things running, then it will continue to optimize the code in the background so the execution will become faster and smoother as it runs. The un-optimized code is swapped out for the more optimized code without stopping execution. We do not have control of this process and it can happen multiple times to achieve the high performance that we can get on modern systems. Each browser handles this process slightly differently.

// JavaScript Runtimes
// A runtime is effectively a big container that contains all of the things we need to use JavaScript. There are two main types of runtimes, those within browsers, and those outside of browswers.

// In browsers:
// The heart of the browser runtime is the JavaScript engine. Without an engine, there is no runtime and no JavaScript to run. A browser runtime also needs access to the web APIs in order to get things to work, as these allow the program to access the DOM and the console etc. that allow JavaScript to run properly, and they also free up interaction with these APIs to us, the programmer. A runtime also includes a callback queue, which is a datastructure that includes all of the callback functions that are ready to be executed. Event handler functions are also called callback functions. When we click a button with the click event on it, an event loop takes the relevant callback function from the callback queue and then adds it to the call stack. When the function is on the stack, it can be used in the program where it needs to be used. This is done in a way that does not block the operation of the rest of the code, hence the non-blocking nature of the event loop concurreny model.

// Not in browsers:
// Outside of browsers the web APIs are not available as there is no web to interact with, but there is something called the 'C++ bindings and thread pool' which steps in to allow us similar functionality. This allows us to still access the console etc. and execute our code in a non-browser environment.

// EXECUTION CONTEXTS AND THE CALL STACK

// Execution Context
// There are different execution contexts that determine when and how different parts of the code can run. These are like boxes that store all the ncessary information and resources for code to run, this can include the variables needed for something to run. When these variables are no longer needed, it is wasteful to hold on to them too closely, and it could be better to drop them entirely in order to free up system resources. So, things might run in different execution contexts or scopes in order to optimize our resource management and execution.

// Global-execution context:
// This for the top-level code, code that is not in any function. This is executed first and does not need to be explicitly called. For example, when we set up variables in the pig game to get the game working. There is only ever one global-excecution context, and is the default level to start execution. Once this code has finished executed, functions can be run. For each function or method, a new execution context is created for their running. All of these together make up the call stack.

// Inside any execution context is a variable environment, where all variables and function definitions are stored. There is also an arguments object, which stores all of the arguments fed into the function. A function can also access variables defined in the global execution context, using references to variables scoped outside of this execution context, this is enavbled by something called the 'scope chain', which we will talk about later. There is also the 'this' keyword, for applying methods more easily to the function/ object.

// Arrow functions do not have the 'this' keyword or the arguments object, but can inherit these from their parent function that has them. This is a little complicated and will be covered in more detail later on.

// This is almost the same as in Rust. When things are not in scope we cannot access them, unless they were defined in the global EC. When we are done with a specific scope, all variables etc. are dropped from our memory resouces (the stack and the references to the heap).

// The engine keeps track of which function it is running, and which scope it should be in is determined by the call stack. Remember that things pop on and pop off the stack so the execution of the engine can always look at the top scope on the stack. When that scope is done with it is popped off the stack and we go down to the next-highest scope on the stack. The bottom of the stack is the global EC and later functions and scopes are popped onto the stack after it.

// We have to pay attention to execution contexts (which scope(s)) we are in as variables from one scope may not be available in another function etc.

// In JavaScript, scopes are popped off the call stack but may not be completely deleted straightaway. This is where the garbasge collector comes into things, and will find and remove scopes that have been popped off and are no longer in use when it gets around to it. This will also be talked about later.

// The call stack is effectively a map that the engine uses to know where it should be in the order of execution at all times. Unless we really mess up our programming, this provides a very robust system that avoids mistakes in operation.

// When we finally close down the browser or execution environment the global EC is popped off of the callstack and everything is finished.

// SCOPES AND THE SCOPE CHAIN

// Scoping is how our programs variables are organized and accessed, or where do variables 'live' and where can they be accessed.

// In JavaScript we have lexical scoping, that means that scoping is controlled by the placement of functions and blocks in the code, this is different from a language like Python when the indentation controls the scoping specifically.

// Scope is the space or environment in which a certain variable is declared (variable environment in case of functions). There is global scope, function scope and block scope.

// The scope of a variable is the entire region of our code where a certain variable can be accessed.

// Global Scope:
// Outside of any function or block, this is the top-level code. Variables declared in the global scope are accessible everywhere else.

// Function Scope/ Local Scope:
// Also called the 'local scope', this is the scope within a function. Variables declared are accessible only inside the function, not outside. This is effectvely the same as the function's variable environment, but we still need to define it as a scope in this context. Trying to access variables outside of the function scope will result in a reference error, as the variable will not be able to find the variable. They will have been dropped from the stack and heap if we are outside of the function. Traditionally only functions created scopes in JavaScript, but from ES6, blocks could also create a scope.

// Block Scope:
// Variables declared inside of a block, i.e. anything within curly braces. This only applies to let and const variables, these are 'block-scoped', var's are still available outside of a block. Functions are also block scoped, but only within strict mode. If we want a variable inside a block to be available outside of the block we should return the result or declare it as a var to make it available. Block scopes were introduced in ES6 to make JavaScript behave a bit more like other common languages.

// The Scope Chain
// Anything in the global scope is put onto the call stack for use later.
// Functions declared in the global scope will create their own scopes inside the global scope.
// Functions called by other functions will create their own scopes inside the function scope.

// So, we get a chain of scopes that are nested within one another. Every scope gains access to all variables from their parent scopes, this is why all functions and blocks can access anything in the global scope, and functions inside other functions can access the variables from the parent's scope. This also applies to a function's arguments.  variables declared in the global scope are known as global variables.

// If code needs to use a variable that it doesn't have defined, it can look up at the parent scopes to see if the variable is present there. If it is there, it can be used, but if not there will be a reference error. This is called 'Variable Lookup'

// This does not work the other way around, a parent scope will never get access to a variable in an inner scope. To get around this we have to return variables to the parent scope.

// Blocks will also create scopes for let and const variables. This will be an inner scope of its parent. Remember that vars are function scoped and not block scoped so it won't affect their availability.

// If we have sibling scopes of the same scope, we have to be careful, because they are not written within one another, they will not be able to access each other's variables.

// The difference between the scope chain and the call stack
// The call stack is an order of execution contexts for each function in the order they were called, with the global EC at the bottom of the call stack. Each execution context will store the variables within their environments.
// The scope chain is all about the order in which functions are written in the code, but it has nothing to do with the order that the functions were called or the execution contexts in the call stack. The order of function calls is not relevant to the scope chain at all.
// Global functions are accessible everywhere else in the code because of variable lookup.
// We have to pay attention to both the call stack and the scope chain in order to know what can be done and what can be accessed from where.

// Main takeaways:
// Scoping asks the question: 'where do variables live?', and 'where can we access a certain variable and where not?'
// There are three types of scope in JavaScript, the global scope, scopes defined by functions, and scopes defined by blocks.
// Only let and const variables are block-scoped. Variables declared eith var end up in the closest function scope.
// In JavaScript, we have lexical scoping, so the rules of where we can access variables are based on exactly where in code functions and blocks are written.
// Every scope always have access to all the variables form their outer scopes. This is the scope chain.
// When a variable is not in the current scope, the engine looks up in the scope chain until it findsthe variable it is looking for. This is called variable lookup.
// The scope chain is a one-way street, a scope will never have access to the variables of an inner scope.
// The scope chain in a certain scope is equal to the adding together of all the variable environments of the parent scopes.
// The scope chain has nothing to do with the order in which functions were called. It does not affect the scope chain at all.

// SCOPING IN PRACTICE
// The code and notes for this section will be at the top of this file.

// HOSTING AND THE TDZ
// Hoisting:
// Makes some types of variables accessible/usable in the code before they are actually declared. These are variables that are effectively lifted to the top of their scope.
// Basically, the engine will look through the code and hoist functions and variables to a global-esque scope so they can be used straightaway.

// Hoisting really works by the engine scanning the code for variable declarations before execution, and for each variable, creating a new property in the variable environment object that allows these variables to be accessed.

// Hoisting works differently with the following kinds of variables:

// Function declarations:
// Hoisted: Yes
// Initial Value: Actual function
// Scope: Block (strict mode)

// var variables:
// Hoisted: Yes
// Initial Value: 'undefined' - This is strang behaviour that leads to many bugs, so that is why var is not used very often after ES6
// Scope: Function

// let and const variables:
// Hoisted: No
// Initial Value: <uninitialized>, TDZ = Temporal Dead Zone, we cannot access these variables between the beginning of the scope and where the variable is defined
// Scope: Block
// let and const were introduced to get around the problem of vars coming back as 'undefined' in hoisting

// Function expressions and arrow functions
// Hoisted: Depends if defined using var, or let/const
// Initial Value: Depends if defined using var, or let/const
// Scope: Depends if defined using var, or let/const
// How we set these functions up determines how they behave in terms of hoisting

// Temporal Dead Zone, TDZ
// A TDZ is basically the region of a scope where the variable cannot be accessed because it is before it is defined in the code. Even though the variable has been addd to the variable environment object, it is placed in the TDZ until the line of code where it is defined. In short, the code knows the variable is there already, but the value is hoisted to uninitialized until the line where it is defined. After this line, the variable is removed from the TDZ and can be used.

// Why do we need the TDZ?
// This was introduced in ES6 to remove the possiblility to accidentally using a variable before it is officially declared, this can cause very serious bugs that are very hard to find. As this is bad practice, TDZ was introduced to make it impossible to use a variable before it has been declared so it has a correct value. Consts cannot be reassigned from 'undefined' to having a value, so it is easier to make it impossible to use all variables before they have been explicitly defined.

// Hoisting introduces some problems but it makes code a lot more readable and allows us to call functions defined in the global scope anywhere in the code. Var hoisting is just a by-product of the hoisting process, even though var is effectively deprecated, it cannot be removed for backward-compatibility purposes.

// The TDZ makes it easier to avoid and catch errors, as accessing variables before declaration is bad practice and should be avoided anyway. It also allows const variables to actually be immutable and not allow us to redefine them in any situation, we can make a new const with the same name in an inner scope, but this isn't changing the original variable so its immutability is preserved.

// HOISTING AND TDZ IN PRACTICE
// The code and notes for this section will be at the top of this file.

// THE 'THIS' KEYWORD
// The 'this' keyword is a special variable that is created for every execution content and therefore every function. It takes the value of a pointer to its owner, so you can call methods etc. on the function or object calling this function itself. All functions get this apart from an arrow function as it would be useless in that situation in most cases as an arrow function is usually just performing a very quick piece of computation - see below.

// The value of this is only assigned when the function is called. It will not always be the same, and it depends on the way in which a function is called. There are four different ways in which functions can be called.

// Calling as a method:
// this = the object that is calling the method
// We can access all of the properties that the object that is calling the function has.

// Calling as a simple function call:
// this = 'undefined' (only in strict mode, when not it will point to the global window object)

// Calling as an arrow function:
// this = <this of the surrounding function> - this is called the 'lexical this'
// You basically cannot use this with arrow functions as you will be actualy calling the this of the parent function or the global objext if at the top-level

// Calling as an event listner:
// this = <the DOM element that the handler is attached to>

// So basically, 'this' never actually points to the function, but to its owner or attached element. It does not point to the function itself or to its variable environment, so be careful to that you understand what 'this' is actually referring to before programming around it.

// We can actually call a function in several other ways such as using the new keyword, or the call, apply, or bind methods, but these are more complex and will be covered later on in the course.

// THE THIS KEYWORD IN PRACTICE
// The code and notes for this section will be at the top of this file.

// REGULAR FUNCTIONS VS. ARROW FUNCTIONS
// The code and notes for this section will be at the top of this file.

// PRIMITIVE VS. OBJECTS (PRIMITIVE TYPES VS. REFERENCE TYPES)
// Memory allocation works the same as it does in Rust, primitive values can be kept on the stack as they are of smaller size and won't change size on the program suddenly - their allocation can be plotted out in advance without danger, whereas more complicated variables and variables of a mutable length need to be stored on the heap. Memory often makes use of pointers, or references to things on the heap, and this can cause confusion because sometimes the pointers lead to the same data, even though we might think that they should not.

// This code works as expected, age and oldAge are separate primitive variables stored on the stack, so changing one will not change the other, unless we explicitly mean it to.
let age2 = 36;
let oldAge = age2;
age2 = 37;
console.log(oldAge);
console.log(age2);

// We define an object, this is not a primitive data type, but a collection of variables, so it is hosted on the heap instead of the stack.
const me2 = {
  name: 'Michael',
  age: 36,
};

// We can duplicate this object to make another object with the same properties inside it.
const friend = me2;

// We can then change the age of this friend object because this should be different from the me object.
friend.age = 27;

// However, when we log the contents of each object we can see that changing the age of one object affected the other one as well. This is because the name of the object is just a pointer to data stored on the heap. As both of the objects were created using the same data, their pointers go to the same data, changing one will affect the other as well. Effectively, the data on the heap has two pointers leading to it, and both friend and me have the same destination. This is usually not what we want in a lot of situations.
console.log('Friend:', friend);
console.log('Me:', me2);

// Data types are either primitives: number, string, boolean, undefined, null, symbol, and bigint, and objects: object literal, arrays, functions, etc. Primitive types are stored on the stack. Objects are stored on the heap. Objects are often referred to as reference types, as they act as a reference or pointer to data stored on the heap.

// Primitive types are stored on the stack at a specified memory address that will hold the value of the data type. The name, or identifier, of the variable actually points to the memory address where the value is held. When we use the variable name, it points to the location on the stack, which then retrieves the data. In the above example, when we say that oldAge = age, both variables point to the same memory address. The value in a memory address cannot be changed and is immutable. When we change oldAge, a new memory address is created with a new value, so each variable can act as a distinct reference to distinct data.

// With objects, they are stored on the heap with a memory address and a value. The variable identifier does not actually point to the memory address on the heap, but instead a new piece of memory on the stack which the points to the memory location in the heap. This is why we call objects the reference types. it works this ways beause objects may be too large to be stored on the stack, and could change in size and complexity. The memory address in the stack just allows the program to keep track of where the data it needs is on the heap.

// When we define friend = me2, both of them get the same memory location on the stack, which points to the exact same object on the heap. That means they are effectively exactly the same, so changing one will affect the other. Actually, we can change the value of consts if they are objects, because we are only changing the contents of the data in the heap, and not in the call stack, so actually consts can be mutable in the case of objects and other complex data types.

// In order to change one object without the other, we would have to clone the data instead of just defining things as the same. This takes more memory and system resources, but is a way around this problem which will be explained below. In Python this was known as a 'shallow copy', rather than a 'deep copy', which is actually a duplication of the data, with a different location in the heap, and a different reference to that location on the call stack.

// Topics that are important but will be studied later:
// Prototypal Inheritance (OOP section)
// Event Loop (Asynchronous JavaScript section)
// How the DOM Really Works (Advanced DOM and Events section)

// PRIMITIVES VS. OBJECTS IN PRACTICE

// Primitive Types:
// Everything works as we would expect as each variable is saved into its own distinct object on the stack
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';

console.log(oldLastName);
console.log(lastName);

// However, with objects, they will create an object on the stack that points to a memory location on the heap.

// Reference Types:
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

// When we declare waht we think is a new object to another one, they are getting the same reference pointer on the stack that leads to the same data on the heap. Effectively, we are just created a reference that has two different names or pathways to it.
const marriedJessica = jessica;
// Notice here that even though marriedJessica is declared as a const, we can still change the value of the data in the heap. We could not do something like declare a const as a completely different object, as that would affect the value of the reference object on the stack, it would not be allowed.
marriedJessica.lastName = 'Davis';

// When we change what we think is one of them we are changing the data on the heap, as both object names actually point to the same data, the change will be reflected in both of the named objects. As mentioned before, we have not created a new object at all.
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

// If we really wanted to copy the object we could...

const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

// ... use the Object.assign method with the below syntax, this merges two objects in the heap, here an empty object and the jessica2 object and then returning the two objects afterwards, this makes a copy of the object that is distinct. This creates what is called a 'shallow copy' in JavaScript, which is a new object on the heap, but which only works on the first level of properties on the object, if we have an object inside the object, the inner object will still actually just have the same pointer to a location on the heap. We need a 'deep clone' to completely copy everything.
const marriedJessica2 = Object.assign({}, jessica2);
marriedJessica2.lastName = 'Davis';

// If we try to manipulate an object within an object with a shallow copy, it will actually affect both objects, as the reference to this inner object points to the same location on the heap in both objects. This is a problem with shallow copies which means that it is not always a suitable solution for us to use and we should be careful of this introducing bugs in our code.
marriedJessica2.family.push('Mary');
marriedJessica2.family.push('John');

console.log(jessica2);
console.log(marriedJessica2);

// Deep clones are not easy to acheive, and are beyond the scope of this lecture, like Python, this is usually done with an external library which handles the quite complex creation of a deep clone. We will discuss this in more detail later on.
