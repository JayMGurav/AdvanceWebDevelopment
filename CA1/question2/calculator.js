/**
 *  defines yall the functionalities for the operations
 *  and listens to users commands/input
 *
 *  Jay Gurav
 *  5 sept.  2020
 */

const EventEmitter = require('events');

class Calculator extends EventEmitter {
    constructor(user) {
        super();
        user.on('command', (command, args) => {
            // on getting the command and arguments 
            // find the operation and emit the response accordingly
            switch (command) {
                case 'help':
                case 'add':
                case 'divide':
                case 'multiply':
                case 'subtract':
                case 'sin':
                case 'cos':
                case 'tan':
                case 'cot':
                case 'exit':
                    this[command](args)
                    break;

                default:
                    this.emit('response', '\u001b[31m Unknown command!!, Type \u001b[33m help  \u001b[31m to list all commands.\u001b[0m')
                    break;
            }
        });
    }

    help() {

        // list of all commands available
        this.emit('response', `Available Commands
        \u001b[33m add \u001b[0m    (add 2 3)
        \u001b[33m divide \u001b[0m  (divide 10 2)
        \u001b[33m multiply \u001b[0m    (multiply 2 3)
        \u001b[33m subtract \u001b[0m    (subtract 5 3)
        \u001b[33m sin \u001b[0m     (sin 30)
        \u001b[33m cos \u001b[0m     (cos 30)
        \u001b[33m tan \u001b[0m     (tan 30)
        \u001b[33m cot \u001b[0m     (cot 30)
        \u001b[33m exit \u001b[0m     (exit)    
            `
        );

    }
    // functions
    add(args) {
        let sum = args[0] + args[1]
        // check for NaN
        if (sum !== sum) this.emit('wrongInput', 'Entered Invalid number as operand!!,Please enter a valid number.');
        else this.emit('response', `The sum of ${args[0]} and ${args[1]} is \u001b[32m${sum}`);
    }
    subtract(args) {
        let difference = args[0] - args[1];
        if (difference !== difference) this.emit('wrongInput', 'Entered Invalid number as operand!!,Please enter a valid number.');
        else this.emit('response', `The difference of ${args[0]} and ${args[1]} is \u001b[32m${difference}`);
    }
    multiply(args) {
        let multiply = args[0] * args[1]
        if (multiply !== multiply) this.emit('wrongInput', 'Entered Invalid number as operand!!,Please enter a valid number.');
        else this.emit('response', `The multiplication of ${args[0]} and ${args[1]} is \u001b[32m$${multiply}`);
    }
    divide(args) {
        let divide = args[0] / args[1];
        if (divide !== divide) this.emit('wrongInput', 'Entered Invalid number as operand!!,Please enter a valid number.');
        else this.emit('response', `The division of ${args[0]} and {args[1]} is \u001b[32m$${divide}`);
    }
    sin(args) {
        let sin = Math.sin(args[0]);
        if (sin !== sin) this.emit('wrongInput', 'Entered Invalid number as operand!!,Please enter a valid number.');
        else this.emit('response', `Sin of ${args[0]} is \u001b[32m${sin}`);
    }
    cos(args) {
        let cos = Math.cos(args[0]);
        if (cos !== cos) this.emit('wrongInput', 'Entered Invalid number as operand!!,Please enter a valid number.');
        else this.emit('response', `cos of ${args[0]} is \u001b[32m${cos}`);
    }
    tan(args) {
        let tan = Math.tan(args[0]);
        if (tan !== tan) this.emit('wrongInput', 'Entered Invalid number as operand!!,Please enter a valid number.');
        else this.emit('response', `tan of ${args[0]} is \u001b[32m${tan}`);
    }
    cot(args) {
        let cot = Math.cos(args[0]) / Math.sin(args[0]);
        if (cot !== cot) this.emit('wrongInput', 'Entered Invalid number as operand!!,Please enter a valid number.');
        else this.emit('response', `Cot of ${args[0]} is \u001b[32m${cot}\u001b[0`);
    }
    exit() {
        this.emit('exit');
    }
}


module.exports = (user) => new Calculator(user);