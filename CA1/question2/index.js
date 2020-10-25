/**
 *   Q.2 Create a node js application in which you will make a calculator using events.
 *
 * 
 *  we'll create two Event emitters namely
 *  1. for calculator, which defines all the methods for the operations 
 *  2. for user who enters commands/operations to be calculate
 * 
 *  users functionalities are defined here
 *  and the calculator in calculator.js
 * 
 *  Jay Gurav
 *  5 sept. 2020
 */

const EventEmitter = require('events');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

// clear console
process.stdout.write('\u001B[2J\u001B[0;0f');
process.stdout.write('Type \u001b[33m help \u001b[0m to get list of available commands/operations');
process.stdout.write('\n>');


const user = new EventEmitter();
const calculator = require('./calculator.js')(user);

calculator.on('response', (message) => {
    process.stdout.write(message);
    process.stdout.write('\u001b[0m\n>');
});
calculator.on('exit', () => {
    user.removeAllListeners();
    calculator.removeAllListeners();
    process.exit(0);
});

calculator.on('wrongInput', (msg) => {
    // set color to red
    process.stdout.write('\u001b[31m');
    process.stdout.write(msg);
    // reset color
    process.stdout.write('\u001b[0m');
    process.stdout.write('\n>');
})

readline.on('line', (input) => {
    /** input consists of operation and arguments, separated by spaces
     *  we'll pass this to calcuator to respond appropriately
     *  now coerce the arguments to number
     * 
    */

    let [command, ...args] = input.split(" "),
        newArgs = [];

    let areValid = args.every((arg) => {
        let numberArg = Number(arg);
        newArgs.push(numberArg);
        return numberArg === numberArg;
    });

    // check if values are valid
    if (areValid) {
        user.emit('command', command, newArgs);
    } else {
        calculator.emit('wrongInput', 'Entered Invalid number as operand!!,Please enter a valid number.');
    }
})