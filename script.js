'use strict';

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

//
