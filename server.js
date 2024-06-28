// function add(a,b){
//     return a+b
// }

// var add = function(a,b){
//     return a + b;
// }


// var add = (a,b) => { return a+b }


// var add = (a, b) => a+b; 


// var result = add(3, 5)
// console.log(result);

// (function(){
//     console.log('Sadiq is a coder');
// })();


// function callBack(){
//     console.log('Adding is completed');
// }


// const add = function(a, b, callBack){
//     var result = a + b;
//     console.log('result:', result);
//     callBack()
// }

// add(3,15454, callBack)



// const add = function(a, b, sadiq){
//     var result = a + b;
//     console.log('result:', result);
//     sadiq()
// }

// // add(2,4, function(){
// //     console.log('Adding is completed');
// // })

// add(5,7789645, ()=> console.log('Adding complete'));

const notes = require('./notes.js')
var _ = require('lodash')

console.log('Server is available');

let age = 24

var result = notes.addNumber(age,1)
console.log(result);
console.log(age);

var data = ['Sadiq', 'Sadiq', 2, 5, 2, 7, 6, 7, 'Danish', 'Danish']
var filter = _.uniq(data)
console.log(filter);